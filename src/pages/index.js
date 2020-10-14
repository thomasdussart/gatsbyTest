import React, { useState } from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
// import { Router } from "@reach/router"
// import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
// import About from "./about"
// import Contact from "./contact"

export default function Home({ data }) {
  // if (!isAuthenticated()) {
  //   login()
  //   return <p>Redirecting to login...</p>
  // }

  const [searchValue, setSearchValue] = useState("")
  const [articlesOrder, setArticlesOrder] = useState("DESC")
  const toggle = () => {
    if (articlesOrder === "DESC") {
      setArticlesOrder("ASC")
    } else {
      setArticlesOrder("DESC")
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    setSearchValue(document.getElementById("search").value)
  }

  //search on keypress
  function handleSearchChange(e) {
    document
      .getElementById("search")
      .addEventListener("keyup", handleSearchSubmit(e))
  }

  return (
    <Layout>
      <span
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        `}
      >
        <button onClick={toggle}>Sort</button>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="recherche"
            id="search"
            onChange={handleSearchChange}
          />
          <input type="submit" />
        </form>
      </span>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h3>{data.allMarkdownRemark.totalCount} Posts</h3>

        {data.allMarkdownRemark.edges
          .filter(search =>
            search.node.frontmatter.title
              .toUpperCase()
              .includes(searchValue.toUpperCase())
          )
          .sort((elementA, elementB) => {
            let dateA = new Date(elementA.node.frontmatter.date),
              dateB = new Date(elementB.node.frontmatter.date)

            if (dateA > dateB) {
              return articlesOrder === "DESC" ? -1 : 1
            } else if (dateA < dateB) {
              return articlesOrder === "DESC" ? 1 : -1
            } else {
              return 0
            }
          })
          .map(({ node }) => (
            <div key={node.id}>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h3
                  css={css`
                    margin-bottom: 2 rem;
                    text-decoration: underline;
                  `}
                >
                  {node.frontmatter.title} —{" "}
                  <span
                    className="date"
                    css={
                      new Date(node.frontmatter.date).getFullYear() !==
                      new Date(Date.now()).getFullYear()
                        ? css`
                            color: red;
                          `
                        : css`
                            color: green;
                          `
                    }
                  >
                    {node.frontmatter.date}
                  </span>
                </h3>
                <p>{node.excerpt}</p>
              </Link>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
