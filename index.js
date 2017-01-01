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

var routeInfo=[];
var routes=[];
function startAlgorithm()
{
	console.log("-------Traffic Signal Optimitization algorithm - start --------------\n");

	loadTrafficInformation(runAlgorithm);
}

function runAlgorithm()
{
		routes=findRoutes(routeFrom,routeTo,routeInfo);
		console.log('----the plotted routes are');
		routes.forEach(function(route){
			console.log(route);
		});

		console.log("-------Traffic Signal Optimitization algorithm - end --------------\n");
}


function plotRoutePoints(route,routeTo,route,routeInfo)
{
   if(route.routePoints.length>0)
   {
   	 route.routePoints.push(plotRoutePoints(route,routeTo,route,routeInfo));
   }

   return route;
}

function createGraphFromData(routeInfo)
{
	graph={};
	graph.startNode=null;
	isFirstNode=true;
	if(routeInfo!=null && routeInfo.length>0)
	{
		routeInfo.forEach(function(trafficNode){
			if(isNodeInGraph(trafficNode.from))
			{
				node=createNodeForGraph(trafficNode.from);
				node=findAndAddConnectingNodes(node,routeInfo);
				if(isFirstNode)
				{
					graph.startNode=node;
					isFirstNode=!isFirstNode;
				}
			}
			
		 });
	}
	return graph;
}

function isNodeInGraph(nodeName,graph)
{
	if(graph!=null && graph.nodes!=null && graph.nodes.length>0)
	{   
		flag=false;
		
		return flag;
	}
	else
	{
		return false;
	}

}

function findNodeInGraph(nodeName,node)
{
	if(node.name==nodeName)
	{
		return node;
	}
	if(node!=null && node.connections!=null)
	{
		for(i=0;i<node.connections.length;i++)
		{
			foundNode=findNodeInGraph(nodeName,node.connections[i]);
			if(foundNode){
				return foundNode;
			}
		}

	}

	return null;
}

function createNodeForGraph(nodeName)
{
	node={};
	node.connections=[];
	node.name=nodeName;
	return node;
}

/* 
 - create a graph from the data 
 - traverse the graph to find out if there are connections to the destination.
*/
function findRoutes(routeFrom,routeTo,routeInfo)
{
	routes=[];
	trafficGraph=createGraphFromData(routeInfo);	
	return routes;
}

/* loading traffic information from the csv file entries into a JSON object and then pushing all the JSON
   objects into an array
 */
function loadTrafficInformation(callback)
{
	console.log('----Starting to load traffic data');
		
	var csvFilePath='trafficdata.csv';
	
	csv().fromFile(csvFilePath).on('json',(jsonObj)=>{
	    
	    routeInfo.push(jsonObj);
	    //console.log(jsonObj);
	})
	.on('done',(error)=>{
	    console.log('----Traffic Information loaded');
	    callback();
	});	
}



startAlgorithm();
