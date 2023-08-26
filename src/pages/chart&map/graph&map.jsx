import React from 'react';
import '../contactus/contactus.css'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from 'numeral';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 1,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,000");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "DD/MM/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};



export default function LineGraph() {
    const [Graphdata, setgraphdata] = useState([])
    const [page, setPage] = useState(0)
    const [LeafletMap, setLeafletmap] = useState([])

    useEffect(() => {
        linegraphData()
        leafletmap()

    }, [])
    const linegraphData = () => {
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
            .then((res) => {
                let chartdata = res.data
                let newdatastore = []

                for (let item in chartdata.cases) {
                    let dataobject = {
                        x: item,
                        y: chartdata["cases"][item]
                    }
                    newdatastore.push(dataobject)

                }
                setgraphdata(newdatastore)
                // console.log("newdatastore", newdatastore)


            }).catch((err) => {
                console.log("err", err)
            })
    }

    const leafletmap = () => {
        axios.get('https://disease.sh/v3/covid-19/countries')
            .then((res) => {

                setLeafletmap(res.data)
            }).catch((err) => {
                console.log("err", err)
            })
    }

    return (
        <div className="mainBoxContact">
            <div className="heading">
                Chats And Map
            </div>
            <div className='linegaphbox'>

                {/* ***********************graph************************* */}
                {
                    page === 0 ?
                          <div>
                             <div style={{textAlign:"right",cursor:"pointer",color:"white"}}>
                                    <h5 onClick={()=>{setPage(1)}}>Map</h5>
                                </div>
                                <div className='linegraboxcontent'>
                               
                            {Graphdata?.length > 0 && (
                                <Line
                                    data={{
                                        datasets: [
                                            {
                                                label: 'Cases',
                                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                                borderColor: "white",
                                                data: Graphdata
                                            },
                                        ],
                                    }}
                                    options={options}
                                />
                            )}
                        </div>
                          </div>
                       
                        : page === 1 ?

                            <div >
                                {/* ******************************map**************************** */}
                                <div style={{textAlign:"right",cursor:"pointer",color:"white"}}>
                                    <h5 onClick={()=>{setPage(0)}}>Back</h5>
                                </div>
                                <div style={{width:"100%",height:"100%"}}>
                                    <MapContainer 
                                        style={{height:"70vh"}}
                                       center={[51.505,-0.09]}
                                        zoom={1}
                                        scrollWheelZoom={false}
                                        
                                        >
                                        <TileLayer
                                            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {
                                            LeafletMap.map((data, index) => {
                                                console.log(data)
                                                return (
                                                    <Marker
                                                        icon={L.icon({iconUrl:data.countryInfo.flag,iconSize:[30,30]})}
                                                        key={index}
                                                        position={[data.countryInfo.lat, data.countryInfo.long]}>
                                                        <Popup>
                                                            Details: {[data.country, data.active, data.recovered, data.deaths]}
                                                        </Popup>
                                                    </Marker>
                                                )
                                            })
                                        }
                                    </MapContainer>
                                </div>
                            </div>
                            : null
                }


            </div>




        </div>
    );
}

