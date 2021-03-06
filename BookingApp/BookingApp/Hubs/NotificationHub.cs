﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using System.Web.UI;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BookingApp.Hubs
{
    //[Authorize(Roles = "Admin, Manager")]
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
        private static Timer t = new Timer();

        public void Hello()
        {
            Clients.All.hello("Hello from server");
        }

        public static void Notify(int accommodationCount)
        {
            hubContext.Clients.Group("Admins").clickNotification($"New Accommodations: {accommodationCount} Role:Admin");
        }

        public static void NotifyManager(string owner)
        {
            hubContext.Clients.Group("Managers").approvedNotification($"Accommodation is approved. Role:Manager User:{owner}");
        }

        public void GetTime()
        {
            Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }

        public void TimeServerUpdates()
        {
            t.Interval = 1000;
            t.Start();
            t.Elapsed += OnTimedEvent;
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void StopTimeServerUpdates()
        {
            t.Stop();
        }

        public override Task OnConnected()
        {
            //Ako vam treba pojedinacni User
            //var identityName = Context.User.Identity.Name;

            Groups.Add(Context.ConnectionId, "Admins");
            Groups.Add(Context.ConnectionId, "Managers");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Add(Context.ConnectionId, "Admins");
            //}

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Groups.Remove(Context.ConnectionId, "Admins");
            Groups.Remove(Context.ConnectionId, "Managers");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Remove(Context.ConnectionId, "Admins");
            //}

            return base.OnDisconnected(stopCalled);
        }
    }
}