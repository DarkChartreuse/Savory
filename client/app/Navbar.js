import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Navbar = ({ loginUser }) => (
  <nav className="#ffb74d orange lighten-2 black-text ">
    <ul className="menubuttons left">
      <li>
        <Link to="/">made with love</Link>
      </li>
    </ul>
    <ul className="menubuttons right">
      <li>
        {(!loginUser.isChef) ?
          '' :
          <Link to="/addmeal">add a meal</Link>
        }
      </li>
      <li>
        {(!loginUser.userName) ?
          <Link to="/signup" >create account</Link> :
          <Link to="/profile">{loginUser.userName.toLowerCase()}</Link>
        }
      </li>
      <li>
        {(!loginUser.userName) ?
          <Link to="/signin" >login</Link> :
          <a href="/signout" >logout</a>
        }
      </li>
    </ul>
  </nav>
);

const mapStateToProps = ({ loginUser }) => ({ loginUser });

Navbar.propTypes = {
  loginUser: React.PropTypes.object,
};

export default connect(mapStateToProps)(Navbar);