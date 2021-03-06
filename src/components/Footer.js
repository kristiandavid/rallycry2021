import React from 'react'
import { Link } from 'gatsby'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns">
              <div className="column is-12">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/businesses">
                        Businesses
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/add-update-a-business">
                        Add a business
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Connect with us
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
                &copy;{new Date().getFullYear()} Rally Cry
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
