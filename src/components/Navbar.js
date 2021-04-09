import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/rallyCryLogo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Rally Cry">
              <img src={logo} alt="Rally Cry logo" style={{ width: '130px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              onKeyPress={this.handleKeyPress}
              role="button"
              tabIndex={0}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/businesses">
                Businesses
              </Link>
              <Link className="navbar-item" to="/categories">
                Categories
              </Link>
              <Link className="navbar-item" to="/add-update-a-business">
                Add/Update a Business
              </Link>
              <Link className="navbar-item" to="/contact">
                Connect with us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
