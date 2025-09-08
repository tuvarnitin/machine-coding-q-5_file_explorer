import { useState } from "react"
import { FaChevronRight } from "react-icons/fa";
import { RiFileAddFill, RiFolderAddLine } from "react-icons/ri";
export const List = ({ data, setData }) => {
    const [list, setList] = useState(data)
    const setIsExpanded = (id) => {
        setList(list.map(node => {
            if (id === node.id && node?.isFolder && node.children) {
                return {
                    ...node,
                    isExpanded: !node.isExpanded
                }
            } else {
                return {
                    ...node
                }
            }
        }))
    }

    const addFile = (id) => {
        setList(list.map(l => {
            if (id === l.id && l?.isFolder && l.children) {
                return {
                    ...l,
                    children:[...l.children,{
                        "id": crypto.randomUUID(),
                        "name": prompt("Enter name of file : "),
                        "isFolder": false,
                        "isExpanded": false
                    }]
                }
            } else {
                return {
                    ...l
                }
            }
        }))
    //    setList(newList)
    }

    const addFolder = (id) => {
        const name = prompt("Enter name of file : ")
        setList(list.map(l => {
            if (id === l.id && l?.isFolder) {
                return {
                    ...l,
                    children: [...l.children, {
                        "id": crypto.randomUUID(),
                        "name": name,
                        "isFolder": true,
                        "isExpanded": true,
                        "children":[]
                    }]
                }
            } else {
                return {
                    ...l
                }
            }
        }))
    }
    



    return (
        <div className="node-container">
            {list.map(node => {
                return (
                    <ul key={node.id}>
                        <li key={node.id} className={`node ${node?.isFolder ? "folder" : ''}`}>
                            <p >
                                <span className="name" onClick={(e) => setIsExpanded(node.id)} key={node.id}>
                                    <span>{node?.isFolder && <FaChevronRight />}</span>
                                    <span>{node?.name}</span>
                                </span>
                                <span className="addfile">
                                    {node?.isFolder && <span onClick={()=>addFile(node.id)}><RiFileAddFill /></span>}
                                    {node?.isFolder && <span onClick={()=>addFolder(node.id)}><RiFolderAddLine /></span>}
                                </span>
                            </p>
                            {node?.isExpanded && node?.children && <List data={node?.children} />}
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}
