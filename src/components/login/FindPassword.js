import React, { useState } from 'react';
import Style from "./Style";
import { Paper, TextField, Modal, Typography } from "@material-ui/core";
import Logo from "./../../assets/images/logo_width.png";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { auth, db } from "../../firebase";

const FindPassword = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const classes = Style();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const searchPwd = async () => {
        try {
            const querySnapshot = await db.collection('users')
                .where('displayName', '==', displayName)
                .where('email', '==', email)
                .where('phone', '==', phone)
                .get();

            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0].data();

                auth.sendPasswordResetEmail(email)
                    .then(() => {
                        setResult('비밀번호 재설정을 위한 이메일을 발송하였습니다📬');
                        setError(null);
                        handleOpen();
                    })
                    .catch((error) => {
                        console.error("비밀번호 재설정을 위한 이메일을 발송하지 못했습니다.🥲", error);
                        setError('Failed to send password reset email.');
                        setResult(null);
                        handleOpen();
                    });
            } else {
                setResult(null);
                setError('No user found with the given details.');
                handleOpen();
            }
        } catch (err) {
            console.error("Error finding user:", err);
            setError('Error finding user.');
            setResult(null);
            handleOpen();
        }
    };

    return (
        <div className={classes.login__container}>
            <Paper elevation={1} className={classes.login}>
                <div className={classes.logo}>
                    <img
                        src={Logo}
                        style={{ width: "270px", height: "130px" }}
                        alt="linked-in-logo"
                    />
                </div>
                <div className='searchEmail_form'>
                    <h2 style={{ textAlign: 'center' }}>Find Password</h2>
                    <br />
                    <TextField
                        style={{ width: "260px" }}
                        label="name"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="name"
                    /> <br />
                    <TextField
                        style={{ width: "260px" }}
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                    /><br />
                    <TextField
                        style={{ width: "260px" }}
                        label="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="phone"
                    /><br />
                    <Button className={classes.findEmail_bt}
                        onClick={searchPwd}
                        variant="contained"
                        color="primary">SEARCH</Button>
                    <Link to="/" className={classes.link_back}>login</Link>
                    <p style={{ marginTop: '20px', textAlign: 'center' }}>copyright TTEZO</p>
                </div>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.popup}>
                    <Typography variant="h5" id="simple-modal-title">
                        {result ? 'Password Reset' : 'Error'}
                    </Typography><br />
                    <Typography variant="body4" id="simple-modal-description">
                        {result ? result : error}
                    </Typography>
                    <Button onClick={handleClose}
                        style={{ marginTop: '20px', height: '40px' }}
                        variant="contained"
                        size='small'
                        color="primary"
                        fullWidth
                    >Close</Button>
                </div>
            </Modal>
        </div>
    );
};

export default FindPassword;