import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService{

    listMenuItems(){
        return MENUITEMS;
    }

} 

const MENUITEMS = [
    {
      title: 'Dashboard',
      link: '/admin/summary'
    },
    {
      title: 'Trip Details',
      expanded: false,
      children: [
        {
          title: 'All Trips',
          link: ['/admin/trips']
        },
        {
          title: 'Completed Trips',
          link: ['/admin/trips/complete']
        },
        {
          title: 'Paid Trips',
          link: ['/admin/trips/paid']
        },
        {
          title: 'Active Trips',
          link: ['/admin/trips/active']
        }
      ]
    },
    {
      title: 'Driver Management',
      expanded: false,
      children: [
        {
          title: 'All drivers',
          link: ['/admin/drivers']
        },
        {
          title: 'Accept/Reject',
          link: ['/admin/drivers/verify']
        },
        {
          title: 'Block/Unblock',
          link: ['/admin/drivers/verify']
        }
      ]
    },
    {
      title: 'Passenger Management',
      expanded: false,
      children: [
        {
          title: 'All Passengers',
          link: ['/admin/passengers']
        },
        {
          title: 'Block/Unblock',
          link: ['/admin/passengers/action']
        }
      ]
    },
    {
      title: 'Popular Places',
      link: ['/admin/places']
    },
    {
      title: 'Partner Management',
      expanded: false,
      children: [
        {
          title: 'Corporate Partners',
          link: ['/admin/partners/corporate']
        },
        {
          title: 'Driving Partners',
          link: ['/admin/partners/driving']
        }
      ]
    },
    {
      title: 'Payments and Wallets',
      expanded: false,
      children: [
        {
          title: 'Make payments',
          link: ['/admin/payment']
        },
        {
          title: 'Wallet',
          link: ['/admin/wallet']
        }
      ]
    },
    // {
    //   title: 'Time and Distance',
    //   expanded: false,
    //   children: [
    //     {
    //       title: 'Time Management',
    //       link: ['/admin/time-and-distance']
    //     },
    //   ]
    // },
    {
      title: 'Fare Management',
      expanded: false,
      children: [
        // {
        //   title: 'Wage Percentage',
        //   link: ['/admin/fare']
        // },
        {
          title: 'Fare Settings',
          link: ['/admin/fare']
        },
      ]
    },
    {
      title: 'Notification',
      expanded: false,
      children: [
        {
          title: 'Send Notification',
          link: ['/admin/notification']
        },
      ]
    },
    {
      title: 'Comments',
      link: '/admin/comments'
    },
    {
      title: 'Income Details',
      expanded: false,
      children: [
        {
          title: 'Total Income Drivers',
          link: ['/admin/income/drivers']
        },
        {
          title: 'Total Income Passengers',
          link: ['/admin/income/passengers']
        },
      ]
    },
    {
      title: 'Profiles',
      expanded: false,
      children: [
        {
          title: 'Drivers',
          link: ['/admin/drivers']
        },
        {
          title: 'Passengers',
          link: ['/admin/passengers']
        },
      ]
    },
    {
      title: 'Logout',
      link: '/auth/logout'
    },
  ];