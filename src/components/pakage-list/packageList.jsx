import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Package from '../../services/Package.js';
import mobx from 'mobx';
import Button from '@mui/material/Button';
import AddPackage from '../add-package/AddPackage.jsx'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const rows2 = [
    {
        "name": "Package 1",
        "trackingNumber": "TRACK001",
        "collected": false,
        "lat": 32.0853,
        "lng": 34.7818
    },
    {
        "name": "Package 2",
        "trackingNumber": "TRACK002",
        "collected": true,
        "lat": 32.0809,
        "lng": 34.7815
    },
    {
        "name": "Package 3",
        "trackingNumber": "TRACK003",
        "collected": false,
        "lat": 32.0705,
        "lng": 34.7748
    },
    {
        "name": "Package 4",
        "trackingNumber": "TRACK004",
        "collected": true,
        "lat": 32.075,
        "lng": 34.768
    },
    {
        "name": "Package 5",
        "trackingNumber": "TRACK005",
        "collected": false,
        "lat": 32.0624,
        "lng": 34.7812
    },
    {
        "name": "Package 6",
        "trackingNumber": "TRACK006",
        "collected": true,
        "lat": 32.0821,
        "lng": 34.7757
    },
    {
        "name": "Package 7",
        "trackingNumber": "TRACK007",
        "collected": false,
        "lat": 32.0768,
        "lng": 34.7685
    },
    {
        "name": "Package 8",
        "trackingNumber": "TRACK008",
        "collected": true,
        "lat": 32.0886,
        "lng": 34.7792
    },
    {
        "name": "Package 9",
        "trackingNumber": "TRACK009",
        "collected": false,
        "lat": 32.0699,
        "lng": 34.7687
    },
    {
        "name": "Package 10",
        "trackingNumber": "TRACK010",
        "collected": true,
        "lat": 32.0893,
        "lng": 34.7813
    }
];
export default function PackageList() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [name, setName] = useState();
    const [packageList, setPackageList] = useState([]);
    const [isPress, setIsPress] = useState(false);
    const [status, setStatus] = useState();
    const [selectRow, setSelectRow] = useState();
    const [filteredList, setFilteredList] = useState([])
    const addPackage = () => {
        setIsPress(true)
    }
    const deletePackage = (name) => {
        // console.log("delete")
        // Package.deletePackage(name)
        // Package.getPackages()
        setPackageList(packageList.filter((x) => x.name != name))
        setFilteredList(packageList)

    }
    const nameFilter = (name) => {
        console.log("name", name)
        if (name == ""||name==null||name==undefined) {
            setFilteredList(packageList)
        }
        else {

            console.log("kkkkkkkkkkkkkk", packageList.filter((x) => x.name.includes(name)))
            setFilteredList(packageList.filter((x) => x.name.includes(name) || x.trackingNumber.includes(name)) || name == "")
        }


    }
    const statusFilter = (status) => {
        console.log("status", status)

        if (status != "true" && status != "false") {
            setFilteredList(packageList)
        }
        else {

            console.log(packageList.filter((x) => x.collected == "true" && status == true || x.collected == "false" && status == false) || status == "")
            setFilteredList(packageList.filter((x) => x.collected == true && status == "true" || x.collected == false && status == "false") || status == "")
        }

    }
    
// useEffect(() => {
//     setFilteredList(packageList)
// },[isPress])

useEffect(() => {
    Package.getPackages()
    setPackageList(Package.listPackages);
    setPackageList(rows2)///////////////////////////////////
    setFilteredList(packageList)

    console.log("packageList", filteredList);
}, []);
    useEffect(() => {
        console.log("inside use effect")
        nameFilter(name)
    }, [name])

    useEffect(() => {
        statusFilter(status)
    }, [status])

    useEffect(() => {
        if(Package.isListChange==true){
            alert("list changed")
            Package.isListChange=false
            Package.getPackages()
            setPackageList(Package.listPackages);
            setFilteredList(Package.listPackages)
        }
        Package.getPackages()
        setPackageList(Package.listPackages);
        let c1 = 0, c2 = 0;
        packageList.map((x) => {
            if (x.collected == true) {
                c1 += 1
            }
            else {
                c2 += 1
            }
        })
        setCount1(c1)
        setCount2(c2)
    })
    const proxy = new Proxy(Package.listPackages, {
        get(target, prop, receiver) {
            console.log("get", prop);
            return target[prop];
        }
    });

    console.log("mybe!!!!!!!!!!!", [...proxy]);
    const handleChange = (event) => {
        // row.collected = event.target.value;
        //   setStatus(event.target.value);
        //   setPackageList(...packageList)
        packageList.map((x) => {
            if (x == selectRow) {
                x.collected = event.target.value
            }
        })
    };

    return (
        // <TableContainer component={Paper}>
        <>
            <Button variant="contained" onClick={addPackage}> Add Package</Button>
            {isPress && <AddPackage setIsOpen={setIsPress} />}
            {/* <Button></Button> */}
            <label>search by name/ trackingNumber</label>
            <input id="name" label="name" variant="name" onChange={(e) => setName(e.target.value)} />

            <label>Status - write true/false</label>
            <input id="status" label="status" variant="status" onChange={(e) => setStatus(e.target.value)} />
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">Name (100g serving)</TableCell>
                        <TableCell align="right">trackingNumber</TableCell>
                        <TableCell align="right">collected&nbsp;(g)</TableCell>
                        <TableCell align="right">lat&nbsp;(g)</TableCell>
                        <TableCell align="right">lng&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredList.map((row) => (
                        // setSelectRow(row)
                        // return


                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}

                            </TableCell>
                            <TableCell align='right'>
                                {row.trackingNumber}

                            </TableCell>
                            <TableCell align="right">{row.collected == true ? "true" : "false"}</TableCell>
                            <TableCell align="right">{row.lat}</TableCell>
                            <TableCell align="right">{row.lng}</TableCell>
                            {/* <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={row.collected === true ? "true" : "false"}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="collected" />
                                    <FormControlLabel value="false" control={<Radio />} label="not collected" />
                                </RadioGroup>
                            </FormControl> */}
                            {/* <TableCell align="right">{row.}</TableCell> */}
                            <Button onClick={() => deletePackage(row.name)} variant="outlined"
                                startIcon={<DeleteIcon />}
                            >Delete</Button>
                        </TableRow>
                    )
                    )}

                </TableBody>
                <div>count collected: {count1} count not collected: {count2} and the total is {count1 + count2}</div>
            </Table>
        </>
    );
}

