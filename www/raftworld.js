/*

raftworld : Plan Ingress fields based on walking paths between groups of portals.

Copyright (C) 2017, Jeffrey J. Weston <jjweston@gmail.com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var map;

function init()
{
    var js = document.createElement( "script" );
    js.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey;
    js.onload = mapApiLoaded;
    document.body.appendChild( js );
}

function mapApiLoaded()
{
    map = new google.maps.Map( document.getElementById( "map" ),
                               { center: { lat: 40, lng: -95 }, zoom: 5 } );

    map.controls[ google.maps.ControlPosition.TOP_RIGHT ].push( document.getElementById( "startAddPortal" ));
    map.controls[ google.maps.ControlPosition.RIGHT_TOP ].push( document.getElementById( "addPortal"      ));

    document.getElementById( "addPortal" ).style.display = "none";

    document.getElementById( "startAddPortal"  ).addEventListener( "mouseover", startAddPortalMouseOver );
    document.getElementById( "startAddPortal"  ).addEventListener( "mouseout",  startAddPortalMouseOut  );
    document.getElementById( "startAddPortal"  ).addEventListener( "click",     startAddPortalClick     );
    document.getElementById( "addPortalButton" ).addEventListener( "click",     addPortal               );
}

function startAddPortalMouseOver()
{
    document.getElementById( "startAddPortal" ).style.background = "#EBEBEB";
}

function startAddPortalMouseOut()
{
    document.getElementById( "startAddPortal" ).style.background = "#FFFFFF";
}

function startAddPortalClick()
{
    document.getElementById( "addPortal" ).style.display = "block";
}

function addPortal()
{
    var portalUrl = new URL( document.getElementById( "portalUrl" ).value );
    var portalLocation = portalUrl.searchParams.get( "pll" ).split( "," );
    var portalLatitude  = parseFloat( portalLocation[ 0 ] );
    var portalLongitude = parseFloat( portalLocation[ 1 ] );
    new google.maps.Marker( { position: { lat: portalLatitude, lng: portalLongitude }, map: map } );
    document.getElementById( "portalUrl" ).value = "";
    document.getElementById( "addPortal" ).style.display = "none";
}
