﻿using Business.Abstract;
using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("getAll")]

        public IActionResult Get()
        {

            var result = _productService.GetAll();

            if (result.Success)

            {
                return Ok(result);
            }

            return BadRequest(result);



        }

        [HttpPost("add")]

        public IActionResult Add(Product product)
        {
            var result = _productService.Add(product);

            if (result.Success)
            {

                return Ok(result);


            }
            return BadRequest(result);
        }

        [HttpPost("delete")]


        public IActionResult Delete(  Product product) { 
        
               
            var result = _productService.Delete(product);

            if (result.Success)
            {
                return Ok(result);
            }
        
            return BadRequest(result);  
        }

        [HttpPost("update")]


        public IActionResult Update(Product product) { 
        
          var result = _productService.Update(product);




            if (result.Success)
            {
                return Ok(result);    


            }

            return BadRequest(result);
        
        }
    }
}
