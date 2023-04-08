const { Document, Packer, Paragraph, TextRun } = docx;
const slots = document.querySelectorAll(".slot");
const downloadBtn = document.getElementById("download-btn");
const wordCounter = document.getElementById("word-counter");

slots.forEach((slot) => {
    slot.addEventListener("input", checkRequirements);
    slot.addEventListener("blur", checkFullStop);
    slot.addEventListener("focus", removeRedBackground); // Add this line to remove the red background when the input is focused
});

downloadBtn.addEventListener("click", () => {
    const paragraphs = Array.from(slots)
        .map((slot) => slot.value.trim())
        .join(" ");
    generateDocx(paragraphs);
});

function checkRequirements() {
    let totalWords = 0;
    let sentencesCount = 0;
    let validSentences = true;

    slots.forEach((slot) => {
        const text = slot.value;
        const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
        const sentences = text.trim().split(/[.?!]+/).filter((sentence) => sentence.trim().length > 0);

        // Check if there's more than one sentence or if last character isn't a full stop
        if (sentences.length > 1 || text.trim().slice(-1) !== '.') {
            validSentences = false;
        }

        if (words.length > 0) {
            sentencesCount++;
        }

        totalWords += words.length;
    });

    wordCounter.textContent = totalWords;

    downloadBtn.disabled = !(totalWords >= 100 && sentencesCount === slots.length && validSentences);
}

function checkFullStop(event) {
    const slot = event.target;
    const text = slot.value;
    const sentences = text.trim().split(/[.?!]+/).filter((sentence) => sentence.trim().length > 0);

    if (text.trim().length > 0 && (text.trim().slice(-1) !== '.' || sentences.length > 1)) {
        slot.style.backgroundColor = "#ffcccc";
    } else {
        slot.style.backgroundColor = "";
    }
}

function generateDocx(paragraphText) {
    const textRuns = paragraphText.split("\n").map((text) => new TextRun(text));

    const paragraph = new Paragraph({
        children: textRuns,
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

    Packer.toBlob(document).then((blob) => {
        saveAs(blob, "paragraph.docx");
    });
}

// Add the removeRedBackground function
function removeRedBackground(event) {
    const slot = event.target;
    slot.style.backgroundColor = "";
}