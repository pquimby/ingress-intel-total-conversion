// ==UserScript==
// @id             iitc-plugin-portals-count@yenky
// @name           IITC plugin: Show Berthoud
// @category       Info
// @version        0.1.2.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Display a list of all localized portals by level and faction.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

/* whatsnew
* 0.1.0  : display graphs
* 0.0.10 : show in nav drawer on mobile devices
* 0.0.9  : fix for new intel map
* 0.0.8  : use dialog() instead of alert()
* 0.0.6  : ignoring outside bounds portals (even if close to)
* 0.0.5  : changed table layout, added some colors
* 0.0.4  : reverse show order of portals, using MAX_PORTAL_LEVEL now for array, changed table layout to be more compact, cleaned up code
* 0.0.3  : fixed incorrect rounded portal levels, adjusted viewport
* 0.0.2  : fixed counts to be reset after scrolling
* 0.0.1  : initial release, show count of portals
*/

// use own namespace for plugin
window.plugin.portalcounts = {
  BAR_TOP: 20,
  BAR_HEIGHT: 180,
  BAR_WIDTH: 25,
  BAR_PADDING: 5,
  RADIUS_INNER: 70,
  RADIUS_OUTER: 100,
  CENTER_X: 200,
  CENTER_Y: 100,
};

//count portals for each level available on the map
window.plugin.portalcounts.getPortals = function (){
  //console.log('** getPortals');
  var self = window.plugin.portalcounts;
  var displayBounds = map.getBounds();
  self.enlP = 0;
  self.resP = 0;
  self.neuP = 0;

  self.PortalsEnl = new Array();
  self.PortalsRes = new Array();

  self.BerthoudPortals = ['e9204da8f7364d60ab5ae4a6984edf58.16',
                          'ac4c903f6d9b4b5e8d808ba772648faf.16',
                          'bdf6cd7618fd416aa97925b9480b01e8.16',
                          '7ed6770490df43f39c411dd02d9986f6.16',
                          'e2e647bf7e204bf1b3aae609ba66074b.16',
                          '2bb94babbfa549319803dbb4c3c21c97.16',
                          'be944bf3a9c949f9b9428497daf1648a.16',
                          'd0a77561e1784f3ebb6a3633f59e54b1.16',
                          
                          '4a0610e509614d5b87a1cba6497cb6ea.16',
                          '693955522cc0406198bbd60b68d84558.11',
                          '5de36c30795546cca881d9ff8c3d8a6b.16',
                          '1cfa8173219a467d84922e0ff3a87466.16',
                          '3720cad91706453db5b10756b70a01af.16',

                          '9d930ab6fc8e4305ac888708b5dc28cf.11',

                          '9704107f574043bc9144550925196c02.11',
                          '3165b1b6c733401597783854bc3e0b11.11',
                          'cda4de004ceb4d0f8efca0359d9ada49.16',
                          '84f2f26608154041b91796edfcb8daba.11',
                          'e59081b83e154144b259c5ac8279202c.16',
                          'd56db9cab0944acb8570f40a1bf14193.16',
                          '0cbb326d1e744a809897bfc327f73837.16',
                          
                          '0935a931aad34badbd93921b4359ba7e.16',

                          '239a12f79ea9441f841c4c072264ebf7.16',
                          '54b2f252c458449c8654d6d6f8836c33.11',

                          '1c1687b47a2242b39b32eb69ec450541.16',
                          'da777721f5074a93aa9b4573ac616863.16',
                          '987f92c4f8da4d3d81b3e4148e8e4ab8.16',

                          '19b8aca3a1914b98a7361e3a26a0d118.16',
                          '0e6ccf91120441a387690bf3de9c6f81.16',
                          '8b6549cb28ca45dea5e3c7a5b0c1dc54.11',
                          'be5a3a508fa747659adf2288a1fc58c1.11',

                          '3080925a90b54a3f951373c1103bd57e.16',

                          '2aace2bb10df488e9dc54043593b1668.16',
                          '19501c72317b4956a29a70457e85c7d0.16',

                          'c77f184a880f497ab44f0d819ed7d39c.16',
                          '6a557cfa653449efa4fbdeca6c05cdfe.16',

                          '1da34ec6491a4483bfb50e8405cdfad0.16',
                          '005343f3adc34737a9b0eb7a9ef72587.16',
                          'e360b5f465c24e02ae91eb1458ec13bc.16',
                          'b3df5de0976048698a6ae4043dd6f8d9.12',
                          'e64d160d8a4b4a3fbd23bd77f840555a.16',

                          '480543b939d4405688297641014f8437.12',
                          '3f48baaa53fb45769416366f1e2572b2.16',
                          '509e8221be0c416681e39d23cc32200c.16',
                          '4bb1559e7fe54220840c3feadbd04ab3.12',
                          'e767d666532641099c05860c9a72c432.16',
                          'c9746042069542de81d41994f9feff2d.16',

                          '6ddc7260cb114299abf006bc5b52df06.16',

                          'c825e776dff14e9d9641197f35627b5c.16',

                          'efd6c1533b564fabab898a5380a8c5ec.16',
                          '5bd0b1043cbe43b0b0fac1b57c2169e1.16',
                          '8a92f46fb89e4b4a9206a673b1e1da80.16',
                          'c837f1ed147f498e895b264577ad3166.16',
                          'b4d60e28873040a98d3077ffc5a946eb.16',
                          '673d213903ef4c99bbeb2c3d40f3bab6.16',
                          'd3c0c4a956f74599afcccfa4bd5414e5.16',
                          '44511ab3cdd4406b8a16b5cc8a9cc018.16',

                          '8b5353e045fe4989b4ef48517d5d66c3.12',
                          'b06879fa0b6f4b28beb20765d476f9ec.16',
                          '2112346e8ffb4795a691c0b639bb2e19.16',
                          '26bc3cdf85754cc9bd1034f3846bdece.16',
                          '8ae7237aae3b4085a3f8af764e27509f.11',

                          'ba4f76cd346747ef9ec16ce0ea8e884d.12',
                          '868ce0911a564fd1954153d7679ad87a.16',


                          ];

  for(var level = window.MAX_PORTAL_LEVEL; level > 0; level--){
    self.PortalsEnl[level] = 0;
    self.PortalsRes[level] = 0;
  }

  // console.log('Finding portals...');
  var portalsByLevel = new Array();
  $.each(window.portals, function(i, portal) {
    var level = portal.options.level;
    var team = portal.options.team;
    var guid = portal.options.guid;
    if ($.inArray(guid, self.BerthoudPortals) > -1) {
      portal.setStyle({fillColor:'black'});
      // console.log('Found portal: ' + guid);    
      switch (team){
      case 1 :
        self.resP++;
        self.PortalsRes[level]++;
        break;
      case 2 :
        self.enlP++;
        self.PortalsEnl[level]++;
        break;
      default:
        self.neuP++;
        break;
    } 
    }
  });

  //get portals informations from IITC
  var minlvl = getMinPortalLevel();
  var total = self.neuP + self.enlP + self.resP;

  var counts = '';
  if(total > 0) {
    counts += '<table><tr><th></th><th class="enl">Enlightened</th><th class="res">Resistance</th></tr>';  //'+self.enlP+' Portal(s)</th></tr>';
    for(var level = window.MAX_PORTAL_LEVEL; level > 0; level--){
      counts += '<tr><td class="L'+level+'">Level '+level+'</td>';
      if(minlvl > level)
        counts += '<td colspan="2">zoom in to see portals in this level</td>';
      else
        counts += '<td class="enl">'+self.PortalsEnl[level]+'</td><td class="res">'+self.PortalsRes[level]+'</td>';
      counts += '</tr>';
    }

    counts += '<tr><th>Total:</th><td class="enl">'+self.enlP+'</td><td class="res">'+self.resP+'</td></tr>';

    counts += '<tr><td>Neutral:</td><td colspan="2">';
    if(minlvl > 0)
      counts += 'zoom in to see unclaimed portals';
    else
      counts += self.neuP;
    counts += '</td></tr></table>';

    var svg = $('<svg width="300" height="200">').css('margin-top', 10);

    var all = self.PortalsRes.map(function(val,i){return val+self.PortalsEnl[i]});
    all[0] = self.neuP;

    // bar graphs
    self.makeBar(self.PortalsEnl, 'Enl', COLORS[2], 0                                    ).appendTo(svg);
    self.makeBar(all            , 'All', '#FFFFFF', 1*(self.BAR_WIDTH + self.BAR_PADDING)).appendTo(svg);
    self.makeBar(self.PortalsRes, 'Res', COLORS[1], 2*(self.BAR_WIDTH + self.BAR_PADDING)).appendTo(svg);

    // pie graph
    var g = $('<g>')
      .attr('transform', self.format('translate(%s,%s)', self.CENTER_X, self.CENTER_Y))
      .appendTo(svg);

    // inner parts - factions
    self.makePie(0,                             self.resP/total,               COLORS[1]).appendTo(g);
    self.makePie(self.resP/total,               (self.neuP + self.resP)/total, COLORS[0]).appendTo(g);
    self.makePie((self.neuP + self.resP)/total, 1,                             COLORS[2]).appendTo(g);

    // outer part - levels
    var angle = 0;
    for(var i=self.PortalsRes.length-1;i>=0;i--) {
      if(!self.PortalsRes[i])
        continue;

      var diff = self.PortalsRes[i] / total;
      self.makeRing(angle, angle+diff, COLORS_LVL[i]).appendTo(g);
      angle += diff;
    }

    var diff = self.neuP / total;
    self.makeRing(angle, angle+diff, COLORS_LVL[0]).appendTo(g);
    angle += diff;

    for(var i=0;i<self.PortalsEnl.length;i++) {
      if(!self.PortalsEnl[i])
        continue;

      var diff = self.PortalsEnl[i] / total;
      self.makeRing(angle, angle+diff, COLORS_LVL[i]).appendTo(g);
      angle += diff;
    }

    // black line from center to top
    $('<line>')
      .attr({
        x1: self.resP<self.enlP ? 0.5 : -0.5,
        y1: 0,
        x2: self.resP<self.enlP ? 0.5 : -0.5,
        y2: -self.RADIUS_OUTER,
        stroke: '#000',
        'stroke-width': 1
      })
      .appendTo(g);

    // if there are no neutral portals, draw a black line between res and enl
    if(self.neuP == 0) {
      var x = Math.sin((0.5 - self.resP/total) * 2 * Math.PI) * self.RADIUS_OUTER;
      var y = Math.cos((0.5 - self.resP/total) * 2 * Math.PI) * self.RADIUS_OUTER;

      $('<line>')
        .attr({
          x1: self.resP<self.enlP ? 0.5 : -0.5,
          y1: 0,
          x2: x,
          y2: y,
          stroke: '#000',
          'stroke-width': 1
        })
        .appendTo(g);
    }

    counts += $('<div>').append(svg).html();
  } else {
    counts += '<p>No Portals in range!</p>';
  }

  // I've only seen the backend reduce the portals returned for L4+ or further out zoom levels - but this could change
  // UPDATE: now seen for L2+ in dense areas (map zoom level 14 or lower)
  if (getMinPortalLevel() >= 2) {
   counts += '<p class="help" title="To reduce data usage and speed up map display, the backend servers only return some portals in dense areas."><b>Warning</b>: Portal counts can be inaccurate when zoomed out</p>';
  }

  var total = self.enlP + self.resP + self.neuP;
  var title = total + ' ' + (total == 1 ? 'portal' : 'portals');

  if(window.useAndroidPanes()) {
    $('<div id="portalcounts" class="mobile">'
    + '<div class="ui-dialog-titlebar"><span class="ui-dialog-title ui-dialog-title-active">' + title + '</span></div>'
    + counts
    + '</div>').appendTo(document.body);
  } else {
    dialog({
      html: '<div id="portalcounts">' + counts + '</div>',
      title: 'Portal counts: ' + title,
      width: 'auto'
    });
  }
}

window.plugin.portalcounts.makeBar = function(portals, text, color, shift) {
  var self = window.plugin.portalcounts;
  var g = $('<g>').attr('transform', 'translate('+shift+',0)');
  var sum = portals.reduce(function(a,b){ return a+b });
  var top = self.BAR_TOP;

  if(sum != 0) {
    for(var i=portals.length-1;i>=0;i--) {
      if(!portals[i])
        continue;
      var height = self.BAR_HEIGHT * portals[i] / sum;
      $('<rect>')
        .attr({
          x: 0,
          y: top,
          width: self.BAR_WIDTH,
          height: height,
          fill: COLORS_LVL[i]
        })
        .appendTo(g);
      top += height;
    }
  }

  $('<text>')
    .html(text)
    .attr({
      x: self.BAR_WIDTH * 0.5,
      y: self.BAR_TOP * 0.75,
      fill: color,
      'text-anchor': 'middle'
    })
    .appendTo(g);

  return g;
};

window.plugin.portalcounts.makePie = function(startAngle, endAngle, color) {
  if(startAngle == endAngle)
    return $([]); // return empty element query

  var self = window.plugin.portalcounts;
  var large_arc = (endAngle - startAngle) > 0.5 ? 1 : 0;

  var labelAngle = (endAngle + startAngle) / 2;
  var label = Math.round((endAngle - startAngle) * 100) + '%';

  startAngle = 0.5 - startAngle;
  endAngle   = 0.5 - endAngle;
  labelAngle = 0.5 - labelAngle;

  var p1x = Math.sin(startAngle * 2 * Math.PI) * self.RADIUS_INNER;
  var p1y = Math.cos(startAngle * 2 * Math.PI) * self.RADIUS_INNER;
  var p2x = Math.sin(endAngle   * 2 * Math.PI) * self.RADIUS_INNER;
  var p2y = Math.cos(endAngle   * 2 * Math.PI) * self.RADIUS_INNER;
  var lx  = Math.sin(labelAngle * 2 * Math.PI) * self.RADIUS_INNER / 1.5;
  var ly  = Math.cos(labelAngle * 2 * Math.PI) * self.RADIUS_INNER / 1.5;

  // for a full circle, both coordinates would be identical, so no circle would be drawn
  if(startAngle == 0.5 && endAngle == -0.5)
    p2x -= 1E-5;

  var text = $('<text>')
    .attr({
      'text-anchor': 'middle',
      'dominant-baseline' :'central',
      x: lx,
      y: ly
    })
    .html(label);

  var path = $('<path>')
    .attr({
      fill: color,
      d: self.format('M %s,%s A %s,%s 0 %s 1 %s,%s L 0,0 z', p1x,p1y, self.RADIUS_INNER,self.RADIUS_INNER, large_arc, p2x,p2y)
    });

  return path.add(text); // concat path and text
};

window.plugin.portalcounts.makeRing = function(startAngle, endAngle, color) {
  var self = window.plugin.portalcounts;
  var large_arc = (endAngle - startAngle) > 0.5 ? 1 : 0;

  startAngle = 0.5 - startAngle;
  endAngle   = 0.5 - endAngle;

  var p1x = Math.sin(startAngle * 2 * Math.PI) * self.RADIUS_OUTER;
  var p1y = Math.cos(startAngle * 2 * Math.PI) * self.RADIUS_OUTER;
  var p2x = Math.sin(endAngle   * 2 * Math.PI) * self.RADIUS_OUTER;
  var p2y = Math.cos(endAngle   * 2 * Math.PI) * self.RADIUS_OUTER;
  var p3x = Math.sin(endAngle   * 2 * Math.PI) * self.RADIUS_INNER;
  var p3y = Math.cos(endAngle   * 2 * Math.PI) * self.RADIUS_INNER;
  var p4x = Math.sin(startAngle * 2 * Math.PI) * self.RADIUS_INNER;
  var p4y = Math.cos(startAngle * 2 * Math.PI) * self.RADIUS_INNER;

  // for a full circle, both coordinates would be identical, so no circle would be drawn
  if(startAngle == 0.5 && endAngle == -0.5) {
    p2x -= 1E-5;
    p3x -= 1E-5;
  }

  return $('<path>')
    .attr({
      fill: color,
      d: self.format('M %s,%s ', p1x, p1y)
       + self.format('A %s,%s 0 %s 1 %s,%s ', self.RADIUS_OUTER,self.RADIUS_OUTER, large_arc, p2x,p2y)
       + self.format('L %s,%s ', p3x,p3y)
       + self.format('A %s,%s 0 %s 0 %s,%s ', self.RADIUS_INNER,self.RADIUS_INNER, large_arc, p4x,p4y)
       + 'Z'
    });
};

window.plugin.portalcounts.format = function(str) {
  var re = /%s/;
  for(var i = 1; i < arguments.length; i++) {
    str = str.replace(re, arguments[i]);
  }
  return str;
}

window.plugin.portalcounts.onPaneChanged = function(pane) {
  if(pane == 'plugin-portalcounts')
    window.plugin.portalcounts.getPortals();
  else
    $('#portalcounts').remove()
};

var setup =  function() {
  if(window.useAndroidPanes()) {
    android.addPane('plugin-portalcounts', 'Portal counts', 'ic_action_data_usage');
    addHook('paneChanged', window.plugin.portalcounts.onPaneChanged);
  } else {
    $('#toolbox').append(' <a onclick="window.plugin.portalcounts.getPortals()" title="Display a summary of portals in the current view">Portal counts</a>');
  }

  $('head').append('<style>' +
    '#portalcounts.mobile {background: transparent; border: 0 none !important; height: 100% !important; width: 100% !important; left: 0 !important; top: 0 !important; position: absolute; overflow: auto; z-index: 9000 !important; }' +
    '#portalcounts table {margin-top:5px; border-collapse: collapse; empty-cells: show; width:100%; clear: both;}' +
    '#portalcounts table td, #portalcounts table th {border-bottom: 1px solid #0b314e; padding:3px; color:white; background-color:#1b415e}' +
    '#portalcounts table tr.res th {  background-color: #005684; }' +
    '#portalcounts table tr.enl th {  background-color: #017f01; }' +
    '#portalcounts table th { text-align: center;}' +
    '#portalcounts table td { text-align: center;}' +
    '#portalcounts table td.L0 { background-color: #000000 !important;}' +
    '#portalcounts table td.L1 { background-color: #FECE5A !important;}' +
    '#portalcounts table td.L2 { background-color: #FFA630 !important;}' +
    '#portalcounts table td.L3 { background-color: #FF7315 !important;}' +
    '#portalcounts table td.L4 { background-color: #E40000 !important;}' +
    '#portalcounts table td.L5 { background-color: #FD2992 !important;}' +
    '#portalcounts table td.L6 { background-color: #EB26CD !important;}' +
    '#portalcounts table td.L7 { background-color: #C124E0 !important;}' +
    '#portalcounts table td.L8 { background-color: #9627F4 !important;}' +
    '#portalcounts table td:nth-child(1) { text-align: left;}' +
    '#portalcounts table th:nth-child(1) { text-align: left;}' +
    '</style>');
}

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
