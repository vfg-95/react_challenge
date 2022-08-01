import React, { Component } from 'react'
import axios from "axios"
import css from  "./css/Content.module.css"
import {savedPosts} from "../posts.json";
import PostItemAPI from './PostItemAPI';
import Loader from './Loader';
import API_KEY from "../secrets.js"

export class ContentAPI extends Component {

  constructor(props) {
      super(props)
      this.state = {
          isLoaded: false,
          posts: [],
          savedPosts: [],
      }
  }

  componentDidMount() {
    this.fetchImages()
  }

  async fetchImages() {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
    const fetchedPosts = response.data.hits;
    this.setState({
      isLoaded: true,
      savedPosts: fetchedPosts
    })
  }

  handleChange = (e) => {
      const name = e.target.value.toLowerCase();
      const filteredPosts = this.state.savedPosts.filter((post)=>{
        return post.user.toLowerCase().includes(name);
    })
    this.setState({
      posts: filteredPosts
    })

  }

  render() {
      return (
      <div className={css.Content}>
        <div className={CSS.TitleBar}>
          <h1>My Photos</h1>
            <form>
              <label htmlFor="searchInput">Search:</label>
              <input
              value={this.state.name}
              onChange={(e) => this.handleChange(e)}
              type='search'
              id='searchInput' />
              <h4>posts found {this.state.posts.length}</h4>
            </form>
        </div>
        <div className={css.SearchResults}>
        {
            this.state.isLoaded ?
            <PostItemAPI savedPosts={this.state.posts} />
            : <Loader />
        }
        </div>
      </div>
    )
  }
}

export default ContentAPI
