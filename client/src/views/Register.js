import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: "Microsoft JhengHei"
  },
  container: {
    textAlign: "center"
  },
  logo: {
    borderRadius: "50%"
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "250px"
    },
    display: "flex",
    flexDirection: "column"
  },
  formGrid: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10
  },
  input: {
    margin: "10px auto"
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "40%",
    margin: "50px 0",
    fontFamily: "Microsoft JhengHei"
  },
  title: {
    textAlign: "left",
    display: "inline-block",
    width: "25%"
  },
  radioInput: {
    flexDirection: "row",
    margin: "10px auto",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: "Microsoft JhengHei"
  },
  radio: {
    width: "38%",
    marginRight: 0
  }
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        " ",
        "0",
        "9",
        " ",
        ")",
        " ",
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/,
        " ",
        "-",
        " ",
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function Register() {
  const classes = useStyles();
  const [values, setValues] = useState({
    textmask: "      -    -     ",
    numberformat: "2330"
  });
  const [newValues, setNewValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const [value, setValue] = useState("female");

  const handleRedioChange = event => {
    setValue(event.target.value);
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const handlePasswordChange = prop => event => {
    setNewValues({ ...newValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setNewValues({ ...newValues, showPassword: !newValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
      <Grid item xs={12} className={classes.container}>
        <Grid item xs={12} className={classes.paper}>
          <img src="http://fakeimg.pl/100x100?text=logo&font=lobster" alt="" className={classes.logo} />
        </Grid>
        <Grid item xs={12} className={classes.formGrid}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField label="email" name="email" className={classes.input} />
            <FormControl className={clsx(classes.margin, classes.textField, classes.input)}>
              <InputLabel htmlFor="standard-adornment-password">password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={newValues.showPassword ? "text" : "password"}
                value={newValues.password}
                onChange={handlePasswordChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {newValues.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                name="password"
              />
            </FormControl>
            <TextField label="name" name="name" className={classes.input} />
            <RadioGroup
              aria-label="gender"
              name="gender2"
              className={classes.radioInput}
              value={value}
              onChange={handleRedioChange}
            >
              <span className={classes.title}>gender</span>
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="男"
                labelPlacement="end"
                className={classes.radio}
              />
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="女"
                labelPlacement="end"
                className={classes.radio}
              />
            </RadioGroup>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="formatted-text-mask-input">phone</InputLabel>
              <Input
                value={values.textmask}
                onChange={handleChange("textmask")}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12} className={classes.buttonGrid}>
          <Button variant="outlined" className={classes.button}>
            註冊
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
