import React from "react"
import Layout from "../components/layout"

export default function Contact() {
  return (
    <Layout>
      <form
        action="https://getform.io/f/756c2072-f2ce-4ea5-b590-102c68306dbb"
        method="POST"
      >
        <label>
          Name
          <input type="text" name="name" id="name" />
        </label>
        <div>
          <br />
        </div>
        <label>
          Email
          <input type="email" name="email" id="email" />
        </label>
        <div>
          <br />
        </div>
        <label>
          Subject
          <input type="text" name="subject" id="subject" />
        </label>
        <div>
          <br />
        </div>
        <label>
          Message
          <textarea name="message" id="message" rows="5" />
        </label>
        <div>
          <br />
        </div>
        <button type="submit">Send</button>
        <div>
          <br />
        </div>
        <input type="reset" value="Clear" />
      </form>
    </Layout>
  )
}
