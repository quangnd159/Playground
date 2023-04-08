document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("paragraph-form");
  const slots = Array.from(document.getElementsByClassName("slots"));
  const downloadBtn = document.getElementById("download-btn");
  const wordCountElement = document.getElementById("word-count");

  const { Document, Paragraph, TextRun } = docx;

  function checkSlotContent(slot) {
    const text = slot.value.trim();
    // Ensure there's only one period at the end
    const regex = /^[^.]*(\.)$/;
    return regex.test(text);
  }

  function updateDownloadButton() {
    let wordCount = slots.reduce((count, slot) => {
      const cleanedText = slot.value.trim().replace(/[^\w\s]/gi, '');
      const wordCountInSlot = cleanedText === '' ? 0 : cleanedText.split(" ").length;
      return count + wordCountInSlot;
    }, 0);
    wordCountElement.textContent = wordCount;
    
    // Added the disabled condition for download button
    downloadBtn.disabled = !(wordCount >= 100 && slots.every(checkSlotContent));
    if (downloadBtn.disabled) {
      downloadBtn.classList.add('disabled'); // Adding disabled class (you already mentioned you have it)
    } else {
      downloadBtn.classList.remove('disabled'); // Removing disabled class
    }
  }

  function validateSlot(slot) {
    if (!checkSlotContent(slot)) {
      slot.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    } else {
      slot.style.backgroundColor = '';
    }
  }

  slots.forEach(slot => {
    slot.addEventListener("input", () => {
      updateDownloadButton();
      validateSlot(slot);
    });
    slot.addEventListener("blur", () => validateSlot(slot));
  });

  function generateDocx(paragraphText) {
    const textRuns = paragraphText.split('\n').map(text => new TextRun(text));

    const paragraph = new Paragraph({
        children: textRuns
    });

    // Pass the sections property directly to the Document constructor
    const document = new Document({
        creator: "My App",
        title: "Paragraph Generator",
        description: "Generated document",
        sections: [
            {
                properties: {},
                children: [paragraph],
            },
        ],
    });

    docx.Packer.toBlob(document).then((blob) => {
        saveAs(blob, "paragraph.docx");
    });
  }

  downloadBtn.addEventListener("click", () => {
    const paragraphs = slots.map(slot => slot.value.trim()).join(" ");
    generateDocx(paragraphs);
  });

  // Adjust the textarea height to the content 
  function autoResizeTextarea() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }

  document.querySelectorAll('.slots').forEach(slot => {
    slot.addEventListener('input', autoResizeTextarea);
  });
});