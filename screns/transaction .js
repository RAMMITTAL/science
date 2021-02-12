import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
export default class Transaction extends React.Component {
        constructor() {
            super()
            this.state = {
                hascamerapermissions: null,
                scane: false,
                data,
                buttonstate: 'normal'
            }
        }
        getcamerapermissions = async() => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA)
            this.setState({
                buttonstate: "clicked",
                scane: false,
                hascamerapermissions: status === "granted"
            })
        }
        handlebarcode = async({ type, data }) => {
            this.setState({
                scane: true,
                data: data,
                buttonstate: 'normal'
            })
        }
        render() {
            const hascamerapermissions = this.state.hascamerapermissions
            const scane = this.state.scane
            const buttonstate = this.state.buttonstate
            if (buttonstate === "clicked" && hascamerapermissions) {
                return ( <
                    BarCodeScanner onBarCodescanned = {
                        scane ? undefined : this.handlebarcode
                    }
                    />

                )
            } else if (buttonstate === "normal") {
                return ( <
                    View >
                    <
                    Text > { hascamerapermissions === true ? this.state.data : "Request Camera Permission" } <
                    /Text>  <
                    TouchableOpacity onPress = { this.getcamerapermissions } >
                    <
                    Text > Scan QR Code < /Text>  <
                    /TouchableOpacity>  <
                    /View> );
                }
            }
        }