import React from "react"
import { css } from "@emotion/core"
import { Router } from "@reach/router"
import { login, logout, isAuthenticated, getProfile } from "../utils/auth"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import About from "./about"
import Contact from "./contact"

export default function Home({ data }) {
  // if (!isAuthenticated()) {
  //   login()
  //   return <p>Redirecting to login...</p>
  // }

  return (
    <Layout>
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
          .sort((a, b) => a - b)
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
