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

namespace BookingApp.Controllers
{
    public class PlacesController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Places
        public IQueryable<Place> GetPlaces()
        {
            return db.Places.Include("Region");
        }

        // GET: api/Places/5
        [ResponseType(typeof(Place))]
        public IHttpActionResult GetPlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }

        // PUT: api/Places/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPlace(int id, Place place)
        {         
            var placeName = place.Name;

            Place oldPlace = db.Places.Include("Region").SingleOrDefault(p => p.Id == place.Id);
            Region region = db.Regions.Include("Country").Single(r => r.Id == place.Region.Id);
            place.Region = region;
            place.Name = placeName;

          
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != place.Id)
            {
                return BadRequest();
            }

            //db.Entry(place).State = EntityState.Modified; 
            db.Entry(oldPlace).CurrentValues.SetValues(place); 

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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

        // POST: api/Places
        [ResponseType(typeof(Place))]
        public IHttpActionResult PostPlace(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var a = place.Region.Id;
            var region = db.Regions.SingleOrDefault(r => r.Id == place.Region.Id);
            place.Region = region;
            db.Places.Add(place);
            db.SaveChanges();
            /*
             db.Regions.SingleOrDefault(r => r.Id == id);
            place.Region = region;*/

            return CreatedAtRoute("DefaultApi", new { id = place.Id }, place);
        }

        // DELETE: api/Places/5
        [ResponseType(typeof(Place))]
        public IHttpActionResult DeletePlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return NotFound();
            }

            db.Places.Remove(place);
            db.SaveChanges();

            return Ok(place);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlaceExists(int id)
        {
            return db.Places.Count(e => e.Id == id) > 0;
        }
    }
}