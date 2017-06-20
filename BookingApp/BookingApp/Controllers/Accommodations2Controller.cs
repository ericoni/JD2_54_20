using System;
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
using System.Data.Entity.Validation;
using BookingApp.Hubs;

namespace BookingApp.Controllers
{
    public class Accommodations2Controller : ApiController
    {
        private BAContext db = new BAContext();

        //// GET: api/Accommodations2
        //public IQueryable<Accommodation> GetAccommodations()
        //{
        //    return db.Accommodations;
        //}

        // GET: api/Accommodations2
        public IQueryable<Accommodation> GetAccommodations()
        {
            return db.Accommodations.Where(u => u.Approved == false);
        }

        // GET: api/Accommodations2/5
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

        // PUT: api/Accommodations2/5
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

        // POST: api/Accommodations2
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //db.Accommodations.SingleOrDefault(u => u.Id == accommodation.Id).Approved = true; // vrati se baki
            //db.Entry(db.Accommodations.SingleOrDefault(u => u.Id == accommodation.Id)).State = EntityState.Modified;

            try {
                //var acc = db.Accommodations.SingleOrDefault(u => u.Id == accommodation.Id);
                //acc.Approved = true;
                //db.Accommodations.Include(acc.Place);
                //db.Entry(acc).State = EntityState.Modified;

                ////db.Accommodations.Add(accommodation);
                //db.SaveChanges();

                using (var db = new BAContext())
                {
                    //var acc = db.Accommodations.SingleOrDefault(u => u.Id == accommodation.Id);

                    //var po = db.Accommodations.Include("Place").Include("UserOwner").Include("AccomodationType").AsQueryable().ToList();

                    //db.Accommodations.Include("UserOwner");
                    var acc = (db.Accommodations.Include("AccomodationType").Include("Place").Include("UserOwner").AsQueryable()).SingleOrDefault(u => u.Id == accommodation.Id);

                    //var acc2 = db.Accommodations.SingleOrDefault(u => u.Id == accommodation.Id);
                    db.Accommodations.Attach(acc);
                    acc.Approved = true;
                    db.Entry(acc).Property(x => x.Approved).IsModified = true;
                    db.SaveChanges();

                    AccommodationsController.accommodationCount--;
                    NotificationHub.NotifyManagers();


                }

            }
            
           catch (DbEntityValidationException e)
            {
                throw;
            }
                return StatusCode(HttpStatusCode.NoContent);
            //return CreatedAtRoute("DefaultApi", new { id = accommodation.Id }, accommodation);
        }

        // DELETE: api/Accommodations2/5
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