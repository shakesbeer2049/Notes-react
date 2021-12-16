

const Note = ({note, toggle}) => {

    return(
        <>
        <li className="list-element grid-item"> {note.content}
        <button className="imp" onClick={toggle}>{note.important?"Make not important":"Make important"}</button>
         </li>

        </>
    )
}

export default Note