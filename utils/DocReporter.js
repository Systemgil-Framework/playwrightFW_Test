const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, ImageRun, HeadingLevel } = require('docx');

class DocReporter {
  constructor() {
    this.children = [
      new Paragraph({
        text: "Test Execution Report",
        heading: HeadingLevel.TITLE, // main title
      }),
      new Paragraph(""),
    ];
  }

  async addInitialScreenshot(page, title = "Initial Screenshot") {
    const buffer = Buffer.from(await page.screenshot({ fullPage: true }));

    this.children.push(
      new Paragraph({ text: title, heading: HeadingLevel.HEADING_2 }),
      new Paragraph({
        children: [new ImageRun({ data: buffer, transformation: { width: 450, height: 300 } })],
      }),
      new Paragraph("")
    );
  }

  async addStep(page, stepDescription) {
    const buffer = Buffer.from(await page.screenshot({ fullPage: true }));

    this.children.push(
      new Paragraph({ text: stepDescription, heading: HeadingLevel.NORMAL }),
      new Paragraph({
        children: [new ImageRun({ data: buffer, transformation: { width: 450, height: 300 } })],
      }),
      new Paragraph("")
    );
  }

  async saveReport(fileName = "TestReport.docx") {
    const reportsDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    const filePath = path.join(
      reportsDir,
      `Run-${new Date().toISOString().replace(/[:.]/g, "-")}`,
      fileName
    );

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Re-create the document here so it includes all children
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: this.children,
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    console.log(`Report saved: ${filePath}`);
  }
}

module.exports = DocReporter;
