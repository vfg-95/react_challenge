import React from "react"
import axios from "axios"
import css from "./css/PostItem.module.css";
import API_KEY from "../secrets.js"


function PostItemAPI(props) {
    return (
        props.savedPosts.map(post => {
            // Extra task destructuring 
            const { id, user, type, tags, webformatURL } = post
            return <div className={css.SearchItem} key={id}>
                <p>Artwork type: {type}</p>
                <p>Artist: {user}</p>
                <img src={webformatURL} alt="random"/>
                <p>{tags}</p>
            </div>
            }
        )
    )
}

export default PostItemAPI