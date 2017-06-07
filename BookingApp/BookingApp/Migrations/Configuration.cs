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
            user.Id = 10;
            user.Username = "username1";
            user.Password = "pw1";
            user.Email = "user1@gmail.com";

            var user2 = new AppUser();
            user2.Id = 11;
            user2.Username = "username2";
            user2.Password = "pw2";
            user2.Email = "user2@gmail.com";

            var accomod = new Accommodation();
            var accomod2 = new Accommodation();

            var place = new Place();
            var place2 = new Place();

            var roomReservations = new RoomReservations();
            var roomReservations2 = new RoomReservations();

            var comments = new List<Comment>()
            {
                new Comment() { User = user, Text ="dobar", Grade = 10, Accomodation = accomod  },
                new Comment() { User = user2, Text ="los", Grade = 2, Accomodation = accomod2  },
            };

            var users = new List<AppUser>() { new AppUser() { Id = 10, Email = "lija@live.com", Username = "user1", Comments = comments } };

            accomod.Address = "Jovana Subotica";
            accomod.Approved = true;
            accomod.Comments = comments;
            accomod.AvrageGrade = 50;
            accomod.Description = "opisAccom";

            accomod2.Address = "Nikole Pasica";
            accomod2.Approved = true;
            accomod2.Comments = comments;
            accomod2.AvrageGrade = 40;
            accomod.Description = "opisAccom2";

            var region = new Region();
            region.Id = 1111;
            region.Name = "Zlatibor";
            region.Places =  new List<Place>() { place, place2 };

            var region2 = new Region();
            region2.Id = 1112;
            region2.Name = "Jahorina";
            region2.Places = new List<Place>() { place, place2 };

            place.Id = 111;
            place.Name = "place1";
            place.Region = region;
            place.Accommodations = new List<Accommodation>() { accomod, accomod2 };
  
            place2.Id = 1112;
            place2.Name = "place2";
            place2.Region = region;
            place2.Accommodations = new List<Accommodation>() { accomod, accomod2 };

            var room = new Room();
            room.Id = 300;
            room.Description = "opisSobe1";
            room.PricePerNight = 100;
            room.RoomNumber = 4;
            room.BedCount = 3;
            room.Accomodation = accomod;
            room.RoomReservations = new List<RoomReservations>() { roomReservations, roomReservations2 };

            var room2 = new Room();
            room2.Id = 301;
            room2.Description = "opisSobe12";
            room2.PricePerNight = 97;
            room2.RoomNumber = 6;
            room2.BedCount = 3;
            room2.Accomodation = accomod;
            room2.RoomReservations = new List<RoomReservations>() { roomReservations, roomReservations2 };

            var country = new Country();
            country.Id = 400;
            country.Name = "Serbia";
            country.Regions = new List<Region>() { region, region2 };
            country.Code = 43;

            var country2 = new Country();
            country2.Id = 401;
            country2.Name = "Serbia";
            country2.Regions = new List<Region>() { region2 };
            country2.Code = 44;

            roomReservations.Id = 5555;
            roomReservations.Room = room;
            roomReservations.User = user;
            roomReservations.Timestamp = 5;
            roomReservations.StartDate = new DateTime(2017, 1, 1);
            roomReservations.EndDate = new DateTime(2017, 2, 2);

            roomReservations2.Id = 5556;
            roomReservations2.Room = room2;
            roomReservations2.User = user2;
            roomReservations2.Timestamp = 5;
            roomReservations2.StartDate = new DateTime(2017, 3, 3);
            roomReservations2.EndDate = new DateTime(2017, 4, 4);
        }
    }
}
