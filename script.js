/* practicing note markup with similar notes/code in example */
console.log('Hello World')

// const root = document.getElementById("root");
//need root!?

//this is to save the URL I created
const url = 'http://localhost:3000/notes'

//Grabs my noteTaking element from the DOM
const noteCat = document.getElementById('note-catalog')

//Grabs the form element from the DOM
const form = document.querySelector('#note-form')

//I want each note to be held in a card like border
//Each note should contain title, text body, and date/time last save

/*Event Listeners */
//Need listener for create new note GET/POST *AJAX*
//  -Submit event trigger will render new Note on the DOM
// Need listener for edit old note PUT/PATCH *AJAX*
//  -Submit event will trigger new data to note.
// Need listener for delete note DELETE *AJAX*
//  -Submit event will trigger deletion of Note.
// set a maxwidth span or text will bleed out? if bulma may fix instead

// form element listen for a submit event
// once submit event is triggered, render newly created todo
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const noteText = document.getElementById('note-text').value 
    console.log(noteText)
    createNote(noteText)
    //Clear form after a todo has been created
    form.reset()
})

//add event listeners tothe 'x' and pencil icons in UI
noteCat.addEventListener('click', (e) =>{

    //delete todo if I click on the 'x' icon
    if (e.target.classList.contains('delete')) {
        console.log('note deleted!')
        deleteNote(e.target)
    }

    //delete todo if I click on the pencil icon
    if (e.target.classList.contains('edit')) {
        console.log('editing note')
        updateNote(e.target)
    }
})

/* DOM manipulation */

function renderNoteItem(NoteObj) {
    // Create an li to hold the body of my todo
    const li = document.createElement('li')
    // make the id of the li element the id of my todo object
    li.id = NoteObj.id
    li.classList.add(
            //these strings are Tachyons class names
        'lh-copy',
        'pv3',
        'ba',
        'bl-0',
        'bt-0',
        'br-0',
        'b--dotted',
        'b--black-3'
    )

    renderNoteText(li, NoteObj)
    noteCat.appendChild(li)
}

// Set the innerHTML of the li render
// the value at the key of body in my todo objects
function renderNoteText(li, NoteObj) {
    li.innerHTML = `
    <span class="dib w-60">${NoteObj.body}</span>${NoteObj.updated_at ? moment(NoteObj.updated_at).format('MMM DD, YYYY') : ""
        }<i class="ml2 dark-red fas fa-times delete" ></i > <i class="ml3 fas fa-edit edit"></i>
`
}

//Run this function to render elements to dom
listNotes()

/* API requests */

//Get Requests: get all of the todos in the db
function listNotes() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let item of data) {
                renderNoteItem(item)               
                }
        })
}

//Post request: add a new todo to the db
function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            created_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => renderNoteItem(data))
}



// DELETE request: delete a todo based on id
function deleteNote(notesEl) {
    fetch(url + '/' + `${notesEl.id}`, {
        method: 'DELETE',
    }).then(() => notesEl.parentElement.remove())
}

// PUT request: update a todo based on id
function updateNote(notesEl) {
    const noteText = document.getElementById('note-text').value
    fetch(url+ '/' + `${notesEl.parentElement.id}`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            updated_at: moment().format()
        })
    })
        .then(res => res.json())
        .then(data => {
            renderNoteText(notesEl.parentElement, data)
        })
}

const noteBody = document.getElementById

// async function noteData(url){
// const response = await 
// fetch(url, {
//   method: 'POST', 
//   headers: {"Content-Type": "application/json"}, 
//   body: JSON.stringify({"title": "Hi", "body": "COOL"})
// })
// .then(res => res.json())
// .then(data => {
//     console.log(data)
//     for (let item of data){
//         renderNoteItem(item)
//     }
//     })
// }
// function renderNoteItem(noteObj){
//     const li = document.createElement('li')
//     li.id = noteObj.id
//     li.classList.add(
//         // need to add class names
//     )


// renderNoteText(li,noteObj)
// noteTaking.appendChild(li)

// }
//   // whatever you need to do next
// function renderNoteText(li,noteObj) {
//     li.innerHTML = '
//     '
// }
// list