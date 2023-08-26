import React, { useState } from "react";
import './contactus.css'
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/action";
import { editItem } from "../../redux/action";
import { removeUser } from "../../redux/action";
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

export default function Contactus() {
    const [Page, setPage] = useState(1)
    const [EditData, SetEditData] = useState([])
    const [Editid, SetEditid] = useState("")
    const [selectedstatus, setSelectedstatus] = useState("")
    const [User, SetUser] = useState({
        fname: "",
        lname: "",
    })
    const [status, setStatus] = useState("")
    const opencontact = () => {
        setPage(0)
        console.log("open")
    }
    const dispatch = useDispatch()
    const selectdata = state => state.UserReducer.userData
    const data = useSelector(selectdata)
    useEffect(() => {

        console.log(data)
    }, [])
    console.log(data)
    const handlechangeuser = (name) => (e) => {
        SetUser({ ...User, [name]: e.target.value })
        console.log(User)
    }

    const DeleteData = (id) => {
        dispatch(removeUser(id))
        console.log(id)
        Swal.fire(
            'Contact Delete',
            'Successfully',
            'success'
        )
        setPage(1)
    }

    const submit = () => {
        const { fname, lname } = User
        let data = {
            fname: fname,
            lname: lname,
            status: status
        }
        dispatch(addUser(data))
        console.log(data)
        Swal.fire(
            'Contact Added',
            'Successfully',
            'success'
        )
        setPage(1)
    }



    const editpage = (item, id) => {
        setPage(2)
        SetEditid(id)
        console.log(id)
        SetEditData(item)
        setSelectedstatus(EditData.status)
    }
    const handleChange = (event) => {
        setSelectedstatus(event.target.value);
    };
    const Editcontact = () => {
        const { fname, lname } = User
        let data = {
            fname: fname,
            lname: lname,
            status: selectedstatus
        }
        dispatch(editItem(Editid, data))
        Swal.fire(
            'Contact Updated',
            'Successfully',
            'success'
        )
        setPage(1)
        console.log(data, "edit")
    }
    return (
        <div className="mainBoxContact">
            <div className="heading">
                Contact Page
            </div>
            <div style={Page === 2 ? { display: "none" } : { display: "block", padding: "17px" }} >
                <button className="btn btn-warning" onClick={() => { opencontact() }}>Create Contact </button>
            </div>
            <div>
                {
                    Page === 0 ?
                        <div className="contactFormBox">

                            <form onSubmit={() => { submit() }}>

                                <div className="contactBox">
                                    <div onClick={() => { setPage(1) }} className="backbutton">Back</div>

                                    <div className="contactfieldbox">
                                        <div className="firstnamebox">
                                            <label>First Name :</label>

                                        </div>
                                        <div className="inputnamebox">
                                            <input className="inputbox" name="fname" id="fname" value={User.fname} onChange={handlechangeuser("fname")} type="text" placeholder="First Name" />

                                        </div>
                                    </div>
                                    <div className="contactfieldbox">
                                        <div className="firstnamebox">
                                            <label>Last Name :</label>

                                        </div>
                                        <div className="inputnamebox">
                                            <input className="inputbox" name="lname" value={User.lname} onChange={handlechangeuser("lname")} type="text" placeholder="Last Name" />

                                        </div>
                                    </div>
                                    <div className="contactfieldbox">
                                        <div className="firstnamebox">
                                            <label>Status :</label>

                                        </div>
                                        <div className="radiobutton">
                                            <div>

                                                <input type="radio" value="Active" onChange={(e) => { setStatus(e.target.value) }} name="action" placeholder="Name" />
                                                <label>Active</label>

                                            </div>
                                            <div>

                                                <input type="radio" value="Inactive" onChange={(e) => { setStatus(e.target.value) }} name="action" placeholder="Name" />
                                                <label >Inactive</label>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div style={{ padding: "10px" }}>
                                    <button className="createcontactbutton" value={"submit"} type="submit">Save Contact</button>
                                </div>
                            </form>

                        </div>
                        : Page === 1 ?
                            <div style={{ padding: "20px" }}>
                                {
                                    data.length === 0 ?
                                        <div style={{ color: "white" }}>
                                            <label>No Contact Found</label> &nbsp;<br />
                                            <label>Please Add create contact button</label>
                                        </div>
                                        :
                                        <div className="row">
                                            {
                                                data.map((item, index) => (
                                                    <div key={index} className="allDatacontent col-sm-4">
                                                        <div className="alldataitem">
                                                            <div className="showfield">
                                                                <label className="firstnameshow">First Name :</label>
                                                                <label className="lastnameshow">{item.fname}</label>


                                                            </div>
                                                            <div className="showfield">
                                                                <label className="firstnameshow">Last Name :</label>
                                                                <label className="lastnameshow">{item.lname}</label>

                                                            </div>
                                                            <div className="showfield">
                                                                <label className="firstnameshow">Status :</label>
                                                                <label className="lastnameshow">{item.status}</label>

                                                            </div>
                                                            <div className="actionbutton">
                                                                <button type="button" className="btn btn-success editbutton" onClick={() => { editpage(item, index) }}>Edit</button>
                                                                <button type="button" onClick={() => { DeleteData(index) }} className="btn btn-danger editbutton">Delete</button>

                                                            </div>
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                }



                            </div>
                            : Page === 2 ?
                                <div className="contactFormBox">

                                    <form onSubmit={() => { Editcontact() }}>

                                        <div className="contactBox">
                                            <div className="backbutton" onClick={() => { setPage(1) }}>Back</div>

                                            <div className="contactfieldbox">
                                                <div className="firstnamebox">
                                                    <label>First Name :</label>

                                                </div>
                                                <div className="inputnamebox">
                                                    <input className="inputbox" onChange={handlechangeuser("fname")} defaultValue={EditData.fname} type="text" placeholder="First Name" />

                                                </div>
                                            </div>
                                            <div className="contactfieldbox">
                                                <div className="firstnamebox">
                                                    <label>Last Name :</label>

                                                </div>
                                                <div className="inputnamebox">
                                                    <input className="inputbox" type="text" onChange={handlechangeuser("lname")} defaultValue={EditData.lname} placeholder="Last Name" />

                                                </div>
                                            </div>
                                            <div className="contactfieldbox">
                                                <div className="firstnamebox">
                                                    <label>Status :</label>

                                                </div>
                                                <div className="radiobutton">
                                                    <div>

                                                        <input type="radio" name="action" value={"Active"} onChange={handleChange} checked={selectedstatus === 'Active'} placeholder="Name" />
                                                        <label>Active</label>

                                                    </div>
                                                    <div>

                                                        <input type="radio" name="action" value={"Inactive"} onChange={handleChange} checked={selectedstatus === 'Inactive'} placeholder="Name" />
                                                        <label >Inactive</label>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div style={{ padding: "10px" }}>
                                            <button className="btn btn-danger" value={"submit"} type="submit">Edit Contact</button>
                                        </div>
                                    </form>

                                </div>
                                : null
                }
            </div>


        </div>
    )
}