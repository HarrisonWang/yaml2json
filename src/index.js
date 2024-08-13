import jsYaml from 'js-yaml'
import html from './index.html'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
//   if (request.method !== 'POST') {
//     return new Response('请发送 POST 请求', { status: 405 })
//   }

  const url = new URL(request.url)
  const path = url.pathname
  try {
	if (path === '/') {
	  return home()
	}else if (path === '/yaml2json') {
      const { yamlString } = await request.json()
	  console.log(yamlString)
	  const jsonString = yaml2json(yamlString)
	  return new Response(jsonString, {
		headers: { 'Content-Type': 'application/json' }
	  })
	} else if (path === '/json2yaml') {
	  const jsonObject = await request.json()
	  const yamlString = json2yaml(jsonObject)
	  return new Response(yamlString, {
		headers: { 'Content-Type': 'application/x-yaml' }
	  })
	}
  } catch (error) {
    return new Response(JSON.stringify({ error: '无效的 YAML 或 JSON：' + error.message }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    })
  }
}

function yaml2json(yamlString) {
	const jsonData = jsYaml.load(yamlString)
    return JSON.stringify(jsonData)
}

function json2yaml(jsonObject) {
	const yamlString = jsYaml.dump(jsonObject, {
		lineWidth: -1,
        forceQuotes: true,
        quotingType: '"',
        noRefs: true,
        noCompatMode: true,
        stripComments: false,
        flowLevel: -1
	})
    return yamlString
}

function home() {
	return new Response(html, {
	  headers: { 'Content-Type': 'text/html' }
	})
  }