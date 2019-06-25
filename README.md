# NodeJS REST App Example 

## Installation
npm install

## Requeriments
- Local MongoDB instance running
- NodeJS

## Postman Requests

{
	"info": {
		"_postman_id": "e43e7c43-5a2b-4294-aa43-7fe3600934f7",
		"name": "NodeJS Udemy",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "POST Crear Usuario NodeJS Udemy",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/x-www-form-urlencoded",
						"type": "text"
					}
				],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "nombre",
							"value": "Alejandro",
							"type": "text"
						},
						{
							"key": "edad",
							"value": "30",
							"type": "text"
						},
						{
							"key": "email",
							"value": "alegomez@lalala.com",
							"type": "text"
						},
						{
							"key": "password",
							"value": "123456",
							"type": "text"
						}
					]
				},
				"url": {
					"raw": "localhost:3000/usuario",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"usuario"
					]
				},
				"description": "Crear un usuario en la bd mongo"
			},
			"response": []
		},
		{
			"name": "PUT Modificar Usuario NodeJS Udemy",
			"request": {
				"method": "PUT",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/x-www-form-urlencoded",
						"type": "text"
					}
				],
				"body": {
					"mode": "urlencoded",
					"urlencoded": [
						{
							"key": "nombre",
							"value": "Alejandro Agustin Gomez",
							"type": "text"
						},
						{
							"key": "edad",
							"value": "30",
							"type": "text",
							"disabled": true
						},
						{
							"key": "email",
							"value": "test5@lalala.com",
							"type": "text",
							"disabled": true
						},
						{
							"key": "password",
							"value": "1111",
							"type": "text"
						},
						{
							"key": "role",
							"value": "asdasd",
							"type": "text",
							"disabled": true
						},
						{
							"key": "google",
							"value": "true",
							"type": "text",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "localhost:3000/usuario/5d111893fdd48a473c8b76a6",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"usuario",
						"5d111893fdd48a473c8b76a6"
					]
				}
			},
			"response": []
		},
		{
			"name": "GET Obtener Usuarios Limite y Pagina NodeJS Udemy",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{url}}/usuario?desde=0&limite=5",
					"host": [
						"{{url}}"
					],
					"path": [
						"usuario"
					],
					"query": [
						{
							"key": "desde",
							"value": "0"
						},
						{
							"key": "limite",
							"value": "5"
						}
					]
				}
			},
			"response": [
				{
					"name": "GET Obtener Usuarios Limite y Pagina NodeJS Udemy",
					"originalRequest": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{url}}/usuario?",
							"host": [
								"{{url}}"
							],
							"path": [
								"usuario"
							],
							"query": [
								{
									"key": "desde",
									"value": "11",
									"disabled": true
								},
								{
									"key": "limite",
									"value": "20",
									"disabled": true
								}
							]
						}
					},
					"status": "OK",
					"code": 200,
					"_postman_previewlanguage": "json",
					"header": [
						{
							"key": "Server",
							"value": "Cowboy"
						},
						{
							"key": "Connection",
							"value": "keep-alive"
						},
						{
							"key": "X-Powered-By",
							"value": "Express"
						},
						{
							"key": "Content-Type",
							"value": "application/json; charset=utf-8"
						},
						{
							"key": "Content-Length",
							"value": "166"
						},
						{
							"key": "Etag",
							"value": "W/\"a6-IkHp3yUAWIAV8vAgo2q2qqHUWFs\""
						},
						{
							"key": "Date",
							"value": "Tue, 25 Jun 2019 19:18:13 GMT"
						},
						{
							"key": "Via",
							"value": "1.1 vegur"
						}
					],
					"cookie": [],
					"body": "{\n    \"ok\": true,\n    \"usuarios\": [\n        {\n            \"role\": \"USER_ROLE\",\n            \"estado\": true,\n            \"google\": false,\n            \"_id\": \"5d125efc54a8b24c283be04e\",\n            \"nombre\": \"Test 16\",\n            \"email\": \"test16@lalala.com\"\n        }\n    ],\n    \"cuantos\": 1\n}"
				}
			]
		},
		{
			"name": "DELETE Borrar Usuario NodeJS Udemy",
			"request": {
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "localhost:3000/usuario/5d121b296bbda24b3c95d7d1",
					"host": [
						"localhost"
					],
					"port": "3000",
					"path": [
						"usuario",
						"5d121b296bbda24b3c95d7d1"
					]
				}
			},
			"response": []
		}
	]
}
