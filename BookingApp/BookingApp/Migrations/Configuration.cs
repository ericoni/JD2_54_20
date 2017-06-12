namespace BookingApp.Migrations
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BookingApp.Models.BAContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookingApp.Models.BAContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            var user = new AppUser();
            user.Username = "username1";
            user.Password = "pw1";
            user.Email = "user1@gmail.com";

            var user2 = new AppUser();
            user2.Username = "username2";
            user2.Password = "pw2";
            user2.Email = "user2@gmail.com";

            var accomod = new Accommodation();
            var accomod2 = new Accommodation();
            var accomods = new List<Accommodation>() { accomod, accomod2 };

            var accomType = new AccommodationType();
            accomType.Name = "Motel";
           // accomType.Accommodations = accomods;

            var accomType2 = new AccommodationType();
            accomType2.Name = "Hotel";
           // accomType2.Accommodations = accomods;

            var place = new Place();
            var place2 = new Place();

            var room = new Room();
            var room2 = new Room();
            var rooms = new List<Room>() { room, room2 };

            var country = new Country();
            country.Name = "Serbia";
            //country.Regions = new List<Region>() { region, region2 };
            country.Code = 43;
            //region.Country = country;

            var country2 = new Country();
            country2.Name = "Serbia";
            //country2.Regions = new List<Region>() { region2 };
            country2.Code = 44;
            //region2.Country = country2;


            var region = new Region();
            region.Name = "Zlatibor";
            region.Country = country;
            //region.Places = new List<Place>() { place, place2 };

            var region2 = new Region();
            region2.Name = "Jahorina";
            region2.Country = country2;
           // region2.Places = new List<Place>() { place, place2 };

            place.Name = "place1";
            place.Region = region;
            //place.Accommodations = new List<Accommodation>() { accomod, accomod2 };

            place2.Name = "place2";
            place2.Region = region2;
            //place2.Accommodations = new List<Accommodation>() { accomod, accomod2 };

            accomod.Address = "Jovana Subotica";
            accomod.Approved = true;
            accomod.User = user;
            //accomod.Comments = comments;
            accomod.AvrageGrade = 50;
            accomod.Description = "opisAccom";
            accomod.AccomodationType = accomType;
            accomod.ImageURL = "urlSlika";
            accomod.Latitude = "49";
            accomod.Longitude = "19";
            accomod.Place = place;
            //accomod.Rooms = rooms;

            accomod2.Address = "Nikole Pasica";
            accomod2.Approved = true;
            accomod2.User = user2;
            //accomod2.Comments = comments;
            accomod2.AvrageGrade = 40;
            accomod2.Description = "opisAccom2";
            accomod2.AccomodationType = accomType2;
            accomod2.ImageURL = "urlSlika2";
            accomod2.Latitude = "49";
            accomod2.Longitude = "19";
            accomod2.Place = place2;
            //accomod.Rooms = rooms;

            var comment = new Comment() { User = user, Text = "dobar", Grade = 10, Accomodation = accomod };
            var comment2 = new Comment() { User = user2, Text = "los", Grade = 2, Accomodation = accomod2 };

            room.Description = "opisSobe1";
            room.PricePerNight = 100;
            room.RoomNumber = 4;
            room.BedCount = 3;
            room.Accomodation = accomod;
            //room.RoomReservations = new List<RoomReservations>() { roomReservations, roomReservations2 };

            room2.Description = "opisSobe12";
            room2.PricePerNight = 97;
            room2.RoomNumber = 6;
            room2.BedCount = 3;
            room2.Accomodation = accomod2;
            //room2.RoomReservations = new List<RoomReservations>() { roomReservations, roomReservations2 };

            var roomReservations = new RoomReservations();
            var roomReservations2 = new RoomReservations();

            roomReservations.Room = room;
            roomReservations.User = user;
            roomReservations.Timestamp = 5;
            roomReservations.StartDate = new DateTime(2017, 1, 1);
            roomReservations.EndDate = new DateTime(2017, 2, 2);

            roomReservations2.Room = room2;
            roomReservations2.User = user2;
            roomReservations2.Timestamp = 5;
            roomReservations2.StartDate = new DateTime(2017, 3, 3);
            roomReservations2.EndDate = new DateTime(2017, 4, 4);

            context.AppUsers.AddOrUpdate(user);
            context.AppUsers.AddOrUpdate(user2);

            context.Accommodations.AddOrUpdate(accomod);
            context.Accommodations.AddOrUpdate(accomod2);

            context.Rooms.AddOrUpdate(room);
            context.Rooms.AddOrUpdate(room2);

            context.RoomReservationss.AddOrUpdate(roomReservations);
            context.RoomReservationss.AddOrUpdate(roomReservations2);

            context.Comments.AddOrUpdate(comment);
            context.Comments.AddOrUpdate(comment2);
            context.SaveChanges();
        }
    }
}
