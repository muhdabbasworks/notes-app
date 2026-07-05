const notesList = document.querySelector("#notes-list")
const form = document.querySelector("#note-form")
const noteContent = document.querySelector("#note-input")
const noteTitle = document.querySelector("#note-title")

const count = document.querySelector("#notes-count")
const searchInput = document.querySelector("#search-input")

const saveBtn = document.querySelector("#save-btn")

let currentNote = null;

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notesArray))
}

function loadNotes() {
    const notes = localStorage.getItem("notes")
    if (notes === null) return
    const stringArray = JSON.parse(notes)
    notesArray = stringArray

}

noteContent.addEventListener("input", () => {
})

noteTitle.addEventListener("input", () => {
})

let notesArray = [
    {
        title: "Welcome to the notepad!",
        content: "Notepad is a powerful recording tool. Add various skin for notes"
    }
]

loadNotes()


function updateUi() {
    saveNotes()
    render()
    updateCounter()
}

updateUi()



function render() {
    notesList.innerHTML = ""
    notesArray.forEach((note, idx)=> {
        const newNote = document.createElement("li")
        newNote.classList.add("note")
        newNote.setAttribute("data-id", idx)
        newNote.innerHTML = `
        <h2 class= "title">${note.title}</h2>
        <p>${note.content}</p>
        <button class="delete-note">✕</button>
        `
        notesList.append(newNote)
    })
    search(searchInput.value);

}

function addNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (!title && !content) return;
    notesArray.push(
        {
            title,
            content
        }
    )
    noteTitle.value = ""
    noteContent.value = ""
}


function updateCounter() {
    count.innerText = notesArray.length
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    saveBtn.hidden = true;
    addNote()
    updateUi()
    
})

function search(word) {
    const cleanWord = word.toLowerCase().trim();
    const notes = document.querySelectorAll(".note")
    notesArray.forEach( (note, idx) => {
        if (!note.title.toLowerCase().includes(cleanWord) && !note.content.toLowerCase().includes(cleanWord) ) {
            notes[idx].classList.add("hidden");
        }
        else {
            notes[idx].classList.remove("hidden");
        }
    })

}


searchInput.addEventListener("input", () => {
    search(searchInput.value)
})



notesList.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    const btn = event.target
    currentNote = Number(li.dataset.id)
    if (btn.classList.contains("delete-note")) {
        notesArray.splice(currentNote, 1)
        console.log(notesArray)
        updateUi()
    }

    else {
        noteTitle.value = notesArray[currentNote].title
        noteContent.value = notesArray[currentNote].content
        saveBtn.hidden = false
    }

})

saveBtn.addEventListener("click", () => {
    if (noteTitle.value === "" || noteContent.value === "") return
    notesArray[currentNote].title = noteTitle.value
    notesArray[currentNote].content = noteContent.value
    noteTitle.value = ""
    noteContent.value = ""
    saveBtn.hidden = true
    currentNote = null
    updateUi()
})