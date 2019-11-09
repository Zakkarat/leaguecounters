import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav
} from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { changeLang } from "../Redux/actions";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { borderRadius } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
  formControlLang: {
    margin: theme.spacing(1),
    minWidth: 80,
    backgroundColor: "#2f3c42",
    borderRadius: "4px"
  },

  formControlRole: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    
    
  },
  selectBackground: {
    backgroundColor: "#2f3c42",
    color: "white",
    paddingLeft: "5px",
    borderRadius: "3px",
  }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const roles = ["Tank", "Mage", "Assassin", "Support", "Fighter", "Marksman"];

const Navbar = ({ language, changeLang }) => {
  const classes = useStyles();
  const [lang, setLang] = useState(language);
  const [role, setRole] = useState([]);
  const [isOpen, setIsOpen] = useState("false");
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = ({ target }) => {
    setLang(target.value);
    changeLang(target.value);
  };
  const handleChangeRole = event => {
    setRole(event.target.value);
  };

  console.log(language);
  return (
    <>
      <MDBNavbar color="special-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">OTP counter</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav>
          <FormControl className={classes.formControlRole}>
            <Select
              multiple
              displayEmpty
              className={classes.selectBackground}
              value={role}
              onChange={handleChangeRole}
              input={<Input />}
              renderValue={selected => {
                if (selected.length === 0) {
                  return <em>Roles</em>;
                }
    
                return selected.join(', ');
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>Roles</em>
              </MenuItem>
              {roles.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={role.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <FormControl variant="outlined" className={classes.formControlLang}>
              <Select
                className="text-white"
                value={lang}
                onChange={handleChange}
              >
                <MenuItem value={"en_US"}>EN</MenuItem>
                <MenuItem value={"ru_RU"}>RU</MenuItem>
              </Select>
            </FormControl>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar></MDBCollapse>
      </MDBNavbar>
    </>
  );
};

const mapStateToProps = ({ language }) => ({
  language
});

const mapDispatchToProps = {
  changeLang
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
