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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { changeLang, rolesFiltering, sorting, search } from "../Redux/actions";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  formControlLang: {
    margin: theme.spacing(1),
    minWidth: 80,
    backgroundColor: "#2f3c42",
    borderRadius: "4px"
  },
  formControlSort: {
    margin: theme.spacing(1),
    minWidth: 90
  },
  formControlRole: {
    margin: theme.spacing(1),
    minWidth: 90,
    maxWidth: 285
  },
  selectBackground: {
    backgroundColor: "#2f3c42",
    color: "white",
    paddingLeft: "5px",
    borderRadius: "3px"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2f3c42",
    width: 285
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "white"
  },
  iconButton: {
    padding: 10
  },
  menuToCenter: {
    alignItems: "center"
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
const sortOptions = ["ASC ↑", "DESC ↓"];
const Navbar = ({ urlReducer, changeLang, rolesFiltering, sorting, search }) => {
  const {language} = urlReducer;
  const classes = useStyles();
  const [lang, setLang] = useState(language);
  const [role, setRole] = useState([]);
  const [sort, setSort] = useState("");
  const [isOpen, setIsOpen] = useState("false");
  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = ({ target }) => {
    setLang(target.value);
    changeLang(target.value);
  };
  const handleChangeRole = ({ target }) => {
    setRole(target.value);
    rolesFiltering(target.value)
  };

  const handleChangeSort = ({ target }) => {
    setSort(target.value);
    sorting(target.value)
  };

  console.log(language);
  return (
    <>
      <MDBNavbar color="special-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">OTP counter</strong>
        </MDBNavbarBrand>
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav className={classes.menuToCenter} center>
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
                  return 'Roles';
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                Roles
              </MenuItem>
              {roles.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={role.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Paper component="form" className={classes.root}>
            <IconButton
              className={classes.iconButton}
              aria-label="menu"
            ></IconButton>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            ></IconButton>
          </Paper>
          <FormControl className={classes.formControlSort}>
            <Select
              displayEmpty
              className={classes.selectBackground}
              value={sort}
              onChange={handleChangeSort}
            >
              <MenuItem disabled value="">
                Sort
              </MenuItem>
              {sortOptions.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBNavbarNav>
        <MDBNavbarNav className={classes.menuToCenter} right>
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
        </MDBCollapse>
        <MDBNavbarToggler onClick={toggleCollapse} />
      </MDBNavbar>
    </>
  );
};

const mapStateToProps = ({ urlReducer }) => ({
  urlReducer
});

const mapDispatchToProps = {
  changeLang, rolesFiltering, sorting, search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
