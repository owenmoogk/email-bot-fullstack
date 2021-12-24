import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams
} from 'react-router-dom';
import { getCookie } from "./CSRF"

export default function Contacts(props) {

	function NewContact() {

		const [data, setData] = useState({ variables: [] })

		function saveContact() {

			fetch("/userdata/addcontact/", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(data)
			})
				.then(response => {
					if (response.status == 200) {
						window.location.href = "/contacts/"
					}
				})
		}

		function addVariable() {
			var varName = document.getElementById('varNameInput').value
			var varValue = document.getElementById('varValueInput').value

			for (var i of document.getElementById('variables').childNodes) {
				if (i.childNodes[0].value == varName) {
					return
				}
			}

			var tmpData = { ...data }
			tmpData.variables.push({ "name": varName, "value": varValue })
			setData(tmpData)
		}

		return (
			<>
				{data
					?
					<>
						<input type="text" id='nameInput' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name"></input>
						<br />
						<input type="text" id='emailInput' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email"></input>
						<br />
						<br />

						<div id='variables'>
							{data.variables.map((variable, key) => {
								return (
									<span id='variableContainer'>
										<input type='text' id='variableName' value={variable.name} key={key} onChange={(e) => {

											// searching thru the variable array to find the right one
											var tmpData = { ...data }
											for (var i = 0; i < tmpData.variables.length; i++) {
												if (tmpData.variables[i].name == variable.name) {
													tmpData.variables[i].name = e.target.value
													break
												}
											}
											setData(tmpData)
										}}></input>
										<input type='text' id='variableValue' value={variable.value} key={key} onChange={(e) => {

											// searching thru the variable array to find the right one
											var tmpData = { ...data }
											for (var i = 0; i < tmpData.variables.length; i++) {
												if (tmpData.variables[i].value == variable.value) {
													tmpData.variables[i].value = e.target.value
													break
												}
											}
											setData(tmpData)
										}}></input>
										<br />
									</span>
								)
							})}
						</div>
					</>
					: null
				}

				<div>
					<br />
					Variables
					<br />
					<input type="text" id='varNameInput' placeholder="Name"></input>
					<input type="text" id='varValueInput' placeholder="Value"></input>
					<button onClick={() => addVariable()}>Add variable</button>
				</div>

				<br />
				<br />
				<button onClick={() => saveContact()}>Save Contact</button>
			</>
		)
	}

	function Contacts() {

		const [contactData, setContactData] = useState()

		useEffect(() => {
			fetch("/userdata/contacts/", {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(response => response.json())
				.then(json => setContactData(json))
		}, [])

		return (
			<>
				{contactData
					? contactData.map((element, key) => {
						return (
							<>
								<a href={'/contacts/' + element.id} key={key}><b>{element.name}</b> -- {element.email}</a>
								<br />
							</>
						)
					})
					: null
				}
				<button onClick={() => window.location.href = '/contacts/add'}>Add Contact</button>
			</>
		)
	}

	function EditContact() {

		const [data, setData] = useState()

		function getContact(id) {
			fetch("/userdata/contact/" + id + "/", {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(response => response.json())
				.then(json => {
					if (json.name && json.email) {
						setData(json)
					}
					else {
						window.location.href = '/404'
					}
				})
		}

		function saveContact(id) {

			fetch("/userdata/contact/edit/" + id + '/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(json => {
					console.log(json)
				})
		}

		function addVariable() {
			var varName = document.getElementById('varNameInput').value
			var varValue = document.getElementById('varValueInput').value

			for (var i of document.getElementById('variables').childNodes) {
				if (i.childNodes[0].value == varName) {
					return
				}
			}

			var tmpData = { ...data }
			tmpData.variables.push({ "name": varName, "value": varValue })
			setData(tmpData)
		}

		function deleteContact(id) {
			fetch("/userdata/contact/delete/" + id + "/", {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(response => response.json())
				.then(json => window.location.href = '/contacts/')
		}

		var { id } = useParams();

		useEffect(() => {
			getContact(id)
		}, [])

		useEffect(() => {
			console.log(data)
		})

		return (
			<>
				{data
					?
					<>
						<input type="text" id='nameInput' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}></input>
						<br />
						<input type="text" id='emailInput' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
						<br />
						<br />

						<div id='variables'>
							{data.variables.map((variable, key) => {
								return (
									<span id='variableContainer'>
										<input type='text' id='variableName' value={variable.name} key={key} onChange={(e) => {

											// searching thru the variable array to find the right one
											var tmpData = { ...data }
											for (var i = 0; i < tmpData.variables.length; i++) {
												if (tmpData.variables[i].name == variable.name) {
													tmpData.variables[i].name = e.target.value
													break
												}
											}
											setData(tmpData)
										}}></input>
										<input type='text' id='variableValue' value={variable.value} key={key} onChange={(e) => {

											// searching thru the variable array to find the right one
											var tmpData = { ...data }
											for (var i = 0; i < tmpData.variables.length; i++) {
												if (tmpData.variables[i].value == variable.value) {
													tmpData.variables[i].value = e.target.value
													break
												}
											}
											setData(tmpData)
										}}></input>
										<br />
									</span>
								)
							})}
						</div>
					</>
					: null
				}

				<div>
					<br />
					Variables
					<br />
					<input type="text" id='varNameInput' placeholder="Name"></input>
					<input type="text" id='varValueInput' placeholder="Value"></input>
					<button onClick={() => addVariable()}>Add variable</button>
				</div>

				<br />
				<br />
				<button onClick={() => saveContact(id)}>Save Contact</button>
				<button onClick={() => deleteContact(id)}>Delete Contact</button>
			</>
		)
	}

	return (
		<>
			<h1>Contacts</h1>
			<Routes>
				<Route exact path='' element={<Contacts />} />
				<Route exact path='add' element={<NewContact />} />
				<Route path=':id' element={<EditContact />} />
			</Routes>
		</>
	)
}
