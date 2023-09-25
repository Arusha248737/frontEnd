import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineService } from '../airline.service';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})

export class FlightListComponent implements OnInit {

  flights: any[] = [];

  criteria: any;

  airlineDetails: any;

  airportDetailsFrom:any;

  airportDetailsTo:any;

  constructor(

    private flightService: FlightServiceService,

    private route: ActivatedRoute,

    private router: Router,

    private airlineservice:AirlineService

 

  ) { }

 

 

 

 

  ngOnInit(): void {

 

    this.route.queryParams.subscribe((queryParams) => {
  
      this.criteria = queryParams;
  
      console.log(this.criteria)
  
   
  
    });
  
    this.sendDataToBackend(this.criteria);
  
  }
  
  sendDataToBackend(data: any) {
  
    this.flightService.getFlights(data).subscribe((response) => {
  
      console.log('API Response', response);
  
      this.flights = response;
  
      if (this.flights && this.flights.length > 0) {
  
        this.flights.forEach((flight) => {
  
          const airlineIATACode = flight.airLineIata;
  
          const iataFrom=flight.iata_from;
  
          const iataTo=flight.iata_to;
  
           // Replace 'airlineIata' with the actual property name in your flight data
  
          console.log(airlineIATACode)
  
          this.fetchAirlineDetails(airlineIATACode);
  
          this.fetchAirportNamesFrom(iataFrom);
  
          this.fetchAirportNamesTo(iataTo);
  
        });
  
      }
  
    });
  
  }
  
   
  
   
  
      fetchAirlineDetails(airlineIATACode: string) {
  
        console.log("helloo")
  
        this.airlineservice.getAirlineDetailsByIATACode(airlineIATACode).subscribe(
  
          (data) => {
  
            this.airlineDetails = data;
  
            // Process airline details as needed
  
            console.log(data);
  
          },
  
          (error) => {
  
            console.error('Error fetching airline details:', error);
  
          }
  
        );
  
      }
  
      fetchAirportNamesFrom(iataFrom: string) {
  
        this.airlineservice.getAirportByCode(iataFrom).subscribe(
  
          (data) => {
  
           this. airportDetailsFrom=data;
  
            // Assuming 'data' contains airport details including the name
  
             // Replace with the actual property name for the airport name
  
            console.log('Airport Name (From):', data);
  
          },
  
          (error) => {
  
            console.error('Error fetching airport details (From):', error);
  
          }
  
        );
  
      }
  
     
  
      fetchAirportNamesTo(iataTo: string) {
  
        this.airlineservice.getAirportByCode(iataTo).subscribe(
  
          (data) => {
  
            // Assuming 'data' contains airport details including the name
  
            this. airportDetailsTo=data; // Replace with the actual property name for the airport name
  
            console.log('Airport Name (To):', data);
  
          },
  
          (error) => {
  
            console.error('Error fetching airport details (To):', error);
  
          }
  
        );
  
      }
    }