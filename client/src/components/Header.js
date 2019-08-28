import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <div className='preloader-wrapper small active'>
              <div className='spinner-layer spinner-green-only'>
                <div className='circle-clipper left'>
                  <div className='circle'></div>
                </div>
                <div className='gap-patch'>
                  <div className='circle'></div>
                </div>
                <div className='circle-clipper right'>
                  <div className='circle'></div>
                </div>
              </div>
            </div>
          </li>
        );
      case false:
        return (
          <li>
            <a href='/auth/google'>Log In With Google</a>
          </li>
        );
      default:
        return (
          <div>
            <li>
              <a href='/api/current_user'>Welcome {this.props.auth.name}</a>
            </li>
            <li>
              <a href='/api/logout'>Logout</a>
            </li>
          </div>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Emaily
          </Link>
          <ul className='right'>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
