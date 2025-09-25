declare module 'pdf-parse' {
  interface PDFData {
    numpages: number;
    numrender: number;
    info: unknown;
    metadata: unknown;
    version: string;
    text: string;
  }

  function pdfParse(buffer: Buffer, options?: unknown): Promise<PDFData>;
  export = pdfParse;
}
