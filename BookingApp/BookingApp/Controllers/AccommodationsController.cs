﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookingApp.Models;
using System.Web.Http.OData;
using BookingApp.Hubs;

namespace BookingApp.Controllers
{
    public class AccommodationsController : ApiController
    {
        private BAContext db = new BAContext();
        public static int accommodationCount { get; set; }


        // GET: api/Accommodations
        [EnableQuery]
        public IQueryable<Accommodation> GetAccommodations()
        {
           var x = db.Accommodations.Include("AccomodationType").Include("Place");// .Include("UserOwner"); 
            return x;                                                                       //zbog UserOwner izbacuje Error getting value from 'Claims' on 'System.Data.Entity.DynamicProxies.
        }

        //[HttpGet]
        //[Route("UnapprovedAccommodations")]
        //public IQueryable<Accommodation> GetUnapprovedAccommodations()
        //{
        //    var unapprovedAcc = db.Accommodations.Where(u => u.Approved == false);
        //    var a = 5;
        //    return db.Accommodations;
        //}

        // GET: api/Accommodations/5
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult GetAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        // PUT: api/Accommodations/5
        //[ResponseType(typeof(void))]
     
        //[HttpPut]
        //[Route("rutaJebena")]
        //public IHttpActionResult PutAccommodation(int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    //if (id != accommodation.Id)
        //    //{
        //    //    return BadRequest();
        //    //}

        //    db.Accommodations.SingleOrDefault(u => u.Id == id).Approved = true;
        //    db.Entry(db.Accommodations.SingleOrDefault(u => u.Id == id)).State = EntityState.Modified;

        //    //db.Entry(accommodation).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AccommodationExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

       
        // PUT: api/Accommodations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccommodation(int id, Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accommodation.Id)
            {
                return BadRequest();
            }

            //db.Accommodations.SingleOrDefault(u => u.Id == id).Approved = true;
            
            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccommodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
           

        // POST: api/Accommodations
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation accommodation) // VRATI SE OVDE 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Place place = db.Places.SingleOrDefault(a => a.Id == accommodation.Place.Id);
            accommodation.Place = place;

            AccommodationType aType = db.AccommodationTypes.SingleOrDefault(a => a.Id == accommodation.AccomodationType.Id);
            accommodation.AccomodationType = aType;

            BAIdentityUser userOwner = db.Users.SingleOrDefault(u => u.UserName == "admin");
            accommodation.UserOwner = userOwner;

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            NotificationHub.Notify(++accommodationCount);

            return CreatedAtRoute("DefaultApi", new { id = accommodation.Id }, accommodation);
        }

        // DELETE: api/Accommodations/5
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            db.Accommodations.Remove(accommodation);
            db.SaveChanges();

            return Ok(accommodation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }
    }
}