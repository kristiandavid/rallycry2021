import * as React from "react"
import Layout from "../components/Layout";

// markup
const NotFoundPage = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="content">
            What did you do?!<br />
            Looks like this page doesn't exist. Try another in the main menu.
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
