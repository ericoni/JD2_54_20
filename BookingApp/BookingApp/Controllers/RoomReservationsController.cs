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
using Microsoft.AspNet.Identity;

namespace BookingApp.Controllers
{
    public class RoomReservationsController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/RoomReservations
        public IQueryable<RoomReservations> GetRoomReservationss()
        {
            var roomReservationsList = db.RoomReservationss.Include("Room").ToList();

            for (int i = 0; i < roomReservationsList.Count; i++)
            {
                var roomId = roomReservationsList[i].Room.Id;
                var room = db.Rooms.Include("Accomodation").SingleOrDefault(r => r.Id == roomId);
                var accommodation = db.Accommodations.SingleOrDefault(a => a.Id == room.Accomodation.Id);
                roomReservationsList[i].Room.Accomodation = accommodation;
            }
            return roomReservationsList.AsQueryable();
        }

        // GET: api/RoomReservations/5
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult GetRoomReservations(int id)
        {
            RoomReservations roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            return Ok(roomReservations);
        }

        // PUT: api/RoomReservations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservations(int id, RoomReservations roomReservations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomReservations.Id)
            {
                return BadRequest();
            }

            db.Entry(roomReservations).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationsExists(id))
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

        // POST: api/RoomReservations
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult PostRoomReservations(RoomReservations roomReservations)
        {   
            var roomRes = roomReservations;
            roomRes.Room = db.Rooms.Include("Accomodation").SingleOrDefault(r => r.Id == roomReservations.Room.Id);
            roomRes.User = db.Users.SingleOrDefault(u => u.UserName == roomReservations.User.UserName);
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomReservationss.Add(roomRes);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roomRes.Id }, roomRes);
        }

        // DELETE: api/RoomReservations/5
        [ResponseType(typeof(RoomReservations))]
        public IHttpActionResult DeleteRoomReservations(int id)
        {
            RoomReservations roomReservations = db.RoomReservationss.Find(id);
            if (roomReservations == null)
            {
                return NotFound();
            }

            db.RoomReservationss.Remove(roomReservations);
            db.SaveChanges();

            return Ok(roomReservations);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationsExists(int id)
        {
            return db.RoomReservationss.Count(e => e.Id == id) > 0;
        }
    }
}