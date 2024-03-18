const fs = require("fs");
const http = require("http");
const url = require('url');

const html = fs.readFileSync("./template/index.html", "utf-8");

const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8")); // object array

const productHtml = fs.readFileSync("./template/product.html", 'utf-8');

const productDetailsHtml = fs.readFileSync("./template/product-details.html", 'utf-8');



// Object array to html Array
let productArrayHtml = products.map(function (item) {
  return replacePlaceholderHtml(productHtml, item);
})
function replacePlaceholderHtml(templateHtml, item) {
  let outputHtml = templateHtml.replace("{{%Image%}}", item.productImage);
  outputHtml = outputHtml.replace("{{%Name%}}", item.name);
  outputHtml = outputHtml.replace("{{%ModelName%}}", item.modelName);
  outputHtml = outputHtml.replace("{{%ModelNumber%}}", item.modelNumber);
  outputHtml = outputHtml.replace("{{%Size%}}", item.size);
  outputHtml = outputHtml.replace("{{%Camera%}}", item.camera);
  outputHtml = outputHtml.replace("{{%Price%}}", item.price);
  outputHtml = outputHtml.replace("{{%Color%}}", item.color);
  outputHtml = outputHtml.replace("{{%ROM%}}", item.ROM);
  outputHtml = outputHtml.replace("{{%DESC%}}", item.Description);
  outputHtml = outputHtml.replace("{{%Id%}}", item.id);

  return outputHtml;

}

const server = http.createServer(function (req, res) {
  // let path = req.url; everything after /

  const { query, pathname: path } = url.parse(req.url, true)
  console.log(query)




  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      myHeader: "hello world",
    });

    res.end(html.replace("{$}", "U are in Home Page"));


  } else if (path.toLocaleLowerCase() === "/about") {


    res.writeHead(200, {
      "Content-Type": "text/html",
      myHeader: "hello world",
    });

    res.end(html.replace("{$}", "U are in About Page"));

  } else if (path.toLocaleLowerCase() === "/contact") {

    res.writeHead(200, {
      "Content-Type": "text/html",
      myHeader: "hello world",
    });

    res.end(html.replace("{$}", "U are in Contact Page"));

  } else if (path.toLocaleLowerCase() == "/products") {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    if (!query.id) {
      console.log(productArrayHtml)
      let productsArray = productArrayHtml.join('');
      console.log(productsArray)

      // fs.readFile("./Data/product.json", "utf-8", function (error, data) {
      //   res.end(data);
      // });
      //--want to read product only once so that performance inc.

      res.end(html.replace("{$}", productsArray));

    } else {
      let item = products[query.id];
      console.log(item);
      let outputHtml = replacePlaceholderHtml(productDetailsHtml, item);

      res.end(html.replace("{$}", outputHtml));

    }


  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      myHeader: "hello world",
    });

    res.end(html.replace("{$}", "Error 404: Page Not Found"));


  }
});


server.on("error", function (error) {
  console.log(error);
});


server.listen("4000", "localhost", function () {
  console.log("Server is running");
});
