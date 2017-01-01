var csv=require('csvtojson');

/*the motive of this program is to find the most efficient route from point A to point B*/

/*
- to find if a route from signal A to Signal B is available.
- then to trace all the routes to check for the least distance  
- then to calculate at what speed to drive to skip the signal lights or to have the minimal stopping time.

Note
- distance is in meters
- time is in seconds
*/
/*loading traffic information*/

var routeFrom='P001';
var routeTo='P005';

var traffic_info=[];
var routes=[];
+function startAlgorithm()
{
	console.log("-------Traffic Signal Optimatization algorithm - start --------------\n");

	loadTrafficInformation(function(){findRoute(routeFrom,routeTo,traffic_info)});
}



function areRoutePointsAvailableInTrafficInfo(routeFrom,routeTo)
{
	console.log('making sure the route points are available');
	routeFromFlag=false;
	routeToFlag=false;
	traffic_info.forEach(function(trafficPoint){
	
		if(trafficPoint.signalFrom==routeFrom)
		{
			routeFromFlag=true;
		}
		else if(trafficPoint.signalTo==routeTo)
		{
			routeToFlag=true;
		}
	});

	if(routeFromFlag & routeToFlag)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function plotRoutePoints(route,routeTo,traffic_Info)
{

}

function findRoutes(routeFrom,routeTo,traffic_info)
{
	routes=[];
	if(areRoutePointsAvailableInTrafficInfo(routeFrom,routeTo))
	{
		console.log('Route points are available');
		secondTrafficPoint=null;
		traffic_info.forEach(function(trafficPoint){
         
         if(trafficPoint.signalFrom==routeFrom && traffciPoint.signalTo!=routeFrom && trafficPoint.signalTo!=routeTo && secondTrafficPoint!=routeTo)
         {
         	route={};
         	route.routePoints=[];
         	route.routePoints.push(trafficPoint);
         	route=plotRoutePoints(route,routeTo,traffic_Info);
         	routes.push(route);
         }
         else
         {
         	route={};
         	route.routePoints=[trafficPoint];
            routes.push(route);
         }

	});
	}
	else
	{
		console.log('Route points are not available');
	}
	return routes;
}

function loadTrafficInformation(callback)
{
	console.log('---- Starting to load traffic data');
		
	var csvFilePath='trafficdata.csv';
	
	csv().fromFile(csvFilePath).on('json',(jsonObj)=>{
	    // combine csv header row and csv line to a json object 
	    // jsonObj.a ==> 1 or 4 
	    traffic_info.push(jsonObj);
	    //console.log(jsonObj);
	})
	.on('done',(error)=>{
	    console.log('-------Traffic Information loaded --------');
	    callback();
	});	
}



startAlgorithm();
