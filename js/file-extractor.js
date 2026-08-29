/**
 * Módulo de Extração de Arquivos no Navegador - Atividade Segura
 * Suporta: PDF (pdf.js), Word .docx (mammoth.js), Excel .xlsx (SheetJS), PowerPoint .pptx (JSZip)
 */

(function () {
  // Configurar worker do PDF.js com tratamento de erro
  try {
    if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
  } catch (e) {
    console.warn("Aviso ao configurar worker do PDF.js:", e);
  }

  const FileExtractor = {
    /**
     * Identifica o formato a partir do nome do arquivo
     */
    detectFormat(fileName) {
      const ext = (fileName || "").split(".").pop().toLowerCase();
      if (ext === "pdf") return "pdf";
      if (ext === "docx" || ext === "doc") return "docx";
      if (ext === "xlsx" || ext === "xls") return "xlsx";
      if (ext === "pptx" || ext === "ppt") return "pptx";
      if (ext === "txt" || ext === "csv") return "txt";
      if (ext === "odt" || ext === "rtf") return "doc";
      return null;
    },

    /**
     * Extração de texto plano (.txt, .csv) direto no navegador
     */
    async extractTxt(file, onProgress) {
      if (onProgress) onProgress("Lendo arquivo de texto...", 60);
      const text = await file.text();
      return {
        text: (text || "").trim(),
        pages: 1
      };
    },

    /**
     * Extrai texto de um documento PDF usando pdf.js com fallback
     */
    async extractPDF(file, onProgress) {
      if (!window.pdfjsLib) {
        return await this.extractViaServer(file, onProgress);
      }
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;
        let fullText = "";

        for (let i = 1; i <= numPages; i++) {
          if (onProgress) onProgress(`Lendo página ${i} de ${numPages}...`, Math.round((i / numPages) * 90));
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          
          let lastY = null;
          let pageStr = "";
          for (const item of textContent.items) {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
              pageStr += "\n";
            } else if (pageStr.length > 0 && !pageStr.endsWith(" ") && !pageStr.endsWith("\n")) {
              pageStr += " ";
            }
            pageStr += item.str;
            lastY = item.transform[5];
          }

          if (pageStr.trim()) {
            fullText += `\n[--- PÁGINA ${i} ---]\n${pageStr.trim()}\n`;
          }
        }

        if (fullText.trim().length > 10) {
          return { text: fullText.trim(), pages: numPages };
        }
        return await this.extractViaServer(file, onProgress);
      } catch (err) {
        console.warn("Falha no pdf.js do navegador, acionando contingência:", err);
        return await this.extractViaServer(file, onProgress);
      }
    },

    /**
     * Extrai texto de Word (.docx) usando mammoth.js ou servidor Python
     */
    async extractDocx(file, onProgress) {
      if (!window.mammoth) {
        return await this.extractViaServer(file, onProgress);
      }
      try {
        if (onProgress) onProgress("Convertendo documento Word...", 50);
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        const text = (result.value || "").trim();
        if (text.length > 10) {
          return { text: text, messages: result.messages || [] };
        }
        return await this.extractViaServer(file, onProgress);
      } catch (err) {
        console.warn("Falha no mammoth.js, usando contingência:", err);
        return await this.extractViaServer(file, onProgress);
      }
    },

    /**
     * Extrai texto e células de planilha Excel usando SheetJS ou servidor
     */
    async extractXlsx(file, onProgress) {
      if (!window.XLSX) {
        return await this.extractViaServer(file, onProgress);
      }
      try {
        if (onProgress) onProgress("Processando planilhas Excel...", 40);
        const arrayBuffer = await file.arrayBuffer();
        const workbook = window.XLSX.read(arrayBuffer, { type: "array" });
        let fullText = "";

        const totalSheets = workbook.SheetNames.length;
        workbook.SheetNames.forEach((sheetName, index) => {
          if (onProgress) onProgress(`Lendo aba "${sheetName}" (${index + 1}/${totalSheets})...`, Math.round(((index + 1) / totalSheets) * 90));
          const sheet = workbook.Sheets[sheetName];
          const csv = window.XLSX.utils.sheet_to_csv(sheet, { FS: " | " });
          if (csv && csv.trim()) {
            fullText += `\n[--- PLANILHA: ${sheetName} ---]\n${csv.trim()}\n`;
          }
        });

        if (fullText.trim().length > 10) {
          return { text: fullText.trim(), sheets: workbook.SheetNames };
        }
        return await this.extractViaServer(file, onProgress);
      } catch (err) {
        console.warn("Falha no SheetJS, usando contingência:", err);
        return await this.extractViaServer(file, onProgress);
      }
    },

    /**
     * Extrai texto de PowerPoint (.pptx) usando JSZip ou servidor
     */
    async extractPptx(file, onProgress) {
      if (!window.JSZip) {
        return await this.extractViaServer(file, onProgress);
      }
      try {
        if (onProgress) onProgress("Descompactando apresentação...", 30);
        const zip = await window.JSZip.loadAsync(file);
        const slidePaths = Object.keys(zip.files).filter(name =>
          /^ppt\/slides\/slide\d+\.xml$/i.test(name)
        );

        if (slidePaths.length === 0) {
          return await this.extractViaServer(file, onProgress);
        }

        slidePaths.sort((a, b) => {
          const numA = parseInt(a.match(/slide(\d+)\.xml/i)[1], 10);
          const numB = parseInt(b.match(/slide(\d+)\.xml/i)[1], 10);
          return numA - numB;
        });

        let fullText = "";
        const parser = new DOMParser();

        for (let i = 0; i < slidePaths.length; i++) {
          const slidePath = slidePaths[i];
          const slideNum = i + 1;
          if (onProgress) onProgress(`Lendo slide ${slideNum} de ${slidePaths.length}...`, Math.round((slideNum / slidePaths.length) * 90));

          const xmlContent = await zip.files[slidePath].async("text");
          const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
          const paragraphs = xmlDoc.getElementsByTagName("a:p");
          const lines = [];

          if (paragraphs.length > 0) {
            for (let p = 0; p < paragraphs.length; p++) {
              const pTexts = paragraphs[p].getElementsByTagName("a:t");
              let pStr = "";
              for (let t = 0; t < pTexts.length; t++) {
                pStr += pTexts[t].textContent;
              }
              if (pStr.trim()) lines.push(pStr.trim());
            }
          }

          if (lines.length > 0) {
            fullText += `\n[--- SLIDE ${slideNum} ---]\n${lines.join("\n")}\n`;
          }
        }

        if (fullText.trim().length > 10) {
          return { text: fullText.trim(), totalSlides: slidePaths.length };
        }
        return await this.extractViaServer(file, onProgress);
      } catch (err) {
        console.warn("Falha no JSZip do navegador, usando contingência:", err);
        return await this.extractViaServer(file, onProgress);
      }
    },

    /**
     * Contingência de Alta Segurança: extrai no servidor backend via Python
     */
    async extractViaServer(file, onProgress) {
      if (onProgress) onProgress("Processando arquivo no motor do servidor...", 70);
      const arrayBuffer = await file.arrayBuffer();
      
      let binary = "";
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const b64 = window.btoa(binary);

      const res = await fetch("/api/arquivo/extrair-texto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeArquivo: file.name,
          base64: b64
        })
      });

      const data = await res.json();
      if (!data.success || !data.texto) {
        throw new Error(data.error || "Não foi possível extrair texto deste documento.");
      }

      return {
        text: data.texto.trim(),
        format: data.formato || "doc"
      };
    },

    /**
     * Ponto de entrada universal: recebe um File e despacha com segurança total
     */
    async extract(file, onProgress) {
      if (!file) throw new Error("Nenhum arquivo fornecido.");
      const format = this.detectFormat(file.name);

      if (!format) {
        throw new Error(
          "Formato não suportado. Por favor, utilize arquivos Word (.docx/.doc), PDF (.pdf), Excel (.xlsx/.xls), PowerPoint (.pptx) ou Texto (.txt/.csv)."
        );
      }

      let result = null;
      try {
        switch (format) {
          case "pdf":
            result = await this.extractPDF(file, onProgress);
            break;
          case "docx":
          case "doc":
            result = await this.extractDocx(file, onProgress);
            break;
          case "xlsx":
            result = await this.extractXlsx(file, onProgress);
            break;
          case "pptx":
            result = await this.extractPptx(file, onProgress);
            break;
          case "txt":
            result = await this.extractTxt(file, onProgress);
            break;
          default:
            result = await this.extractViaServer(file, onProgress);
        }
      } catch (err) {
        console.warn("Tentando contingência no servidor após erro:", err);
        result = await this.extractViaServer(file, onProgress);
      }

      if (!result || !result.text || result.text.trim().length < 5) {
        throw new Error(
          "O arquivo foi lido, mas nenhum texto legível foi encontrado. Verifique se o documento não é apenas uma imagem digitalizada sem OCR."
        );
      }

      return {
        success: true,
        format: format,
        fileName: file.name,
        fileSize: file.size,
        text: result.text,
        metadata: result
      };
    }
  };

  window.FileExtractor = FileExtractor;
})();
