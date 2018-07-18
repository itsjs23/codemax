/**
 * An object representing analytics performance graph.
 */
var GraphAnalytics = function () {
    // DOM references
    this.$graphContainer = document.querySelector('.graph-container');
    this.$medium = document.querySelector('#medium');
    this.$standard = document.querySelector('#standard');

    // DOM events
    this.bindOnload();
    this.bindMediumFilter();
    this.bindStandardFilter();
};

GraphAnalytics.prototype.bindOnload = function () {
    this.$medium.value = 'English';
    this.populateStandardsFilter('English');
    this.populateGraphBlocksByStandard('English');
};

GraphAnalytics.prototype.bindMediumFilter = function () {
    var that = this;

    this.$medium.addEventListener('change', function () {
        that.populateStandardsFilter(that.$medium.value);
        that.populateGraphBlocksByStandard(that.$medium.value);
    });
}

GraphAnalytics.prototype.bindStandardFilter = function () {
    var that = this;

    this.$standard.addEventListener('change', function () {
        if (that.$standard.value) {
            that.populateGraphBlocksBySubject(that.$medium.value, that.$standard.value);
        }
    });
};

GraphAnalytics.prototype.populateStandardsFilter = function (medium) {
    var that = this;

    $httpAjax({
        method: 'GET',
        url: 'graph-analytics/standards-filter/' + medium,
        async: true,
        successCall: function (xhr) {
            that.$standard.innerHTML = xhr.responseText;
        }
    });
};

GraphAnalytics.prototype.populateGraphBlocksByStandard = function (medium) {
    var that = this;

    $httpAjax({
        method: 'GET',
        url: 'graph-analytics/standards-template/' + medium,
        async: true,
        successCall: function (xhr) {
            that.$graphContainer.innerHTML = xhr.responseText;
            that.renderGraphDataByStandard(medium);
        }
    });
};

GraphAnalytics.prototype.populateGraphBlocksBySubject = function (medium, standard) {
    var that = this;

    $httpAjax({
        method: 'GET',
        url: 'graph-analytics/subjects-template/' + medium + '/' + standard,
        async: true,
        successCall: function (xhr) {
            that.$graphContainer.innerHTML = xhr.responseText;
            that.renderGraphDataBySubject(medium, standard);
        }
    });
};

GraphAnalytics.prototype.renderGraphDataByStandard = function (medium) {
    var standardBlocks = document.querySelectorAll('.graph-container .graph-block');
    var count = standardBlocks.length;
    var currentBlock = 0;
    var that = this;

    setInterval(function () {
        if (count > 0) {
            $httpAjax({
                method: 'POST',
                url: 'graph-analytics/fetch-standard-wise-performance/' + medium + '/' + standardBlocks[currentBlock++].dataset.standard,
                async: true,
                successCall: function (xhr) {
                    var graphData = JSON.parse(xhr.responseText);
                    that.drawGraph(graphData.labels, graphData.series, graphData.selector, graphData.average);
                }
            });

            count--;
        }
    }, 800);

};

GraphAnalytics.prototype.renderGraphDataBySubject = function (medium, standard) {
    var subjectBlocks = document.querySelectorAll('.graph-container .graph-block');
    var count = subjectBlocks.length;
    var currentBlock = 0;
    var that = this;

    setInterval(function () {
        if (count > 0) {
            $httpAjax({
                method: 'POST',
                url: 'graph-analytics/fetch-subject-wise-performance/' + medium + '/' + standard + '/' + subjectBlocks[currentBlock++].dataset.subject,
                async: true,
                successCall: function (xhr) {
                    var graphData = JSON.parse(xhr.responseText);
                    that.drawGraph(graphData.labels, graphData.series, graphData.selector, graphData.average);
                }
            });

            count--;
        }
    }, 800);

};

GraphAnalytics.prototype.drawGraph = function (labels, series, selector, average) {
    var data = {
        labels: labels,
        series: [series],
    };

    var options = {
        height: 200,
        seriesBarDistance: 10
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[4];
                    }
                }
            }]
    ];

    new Chartist.Bar(selector, data, options, responsiveOptions);
    document.querySelector(selector + ' .loading-graph').classList.add('hide');
    document.querySelector(selector + ' .avg-data').innerHTML = 'Avg: ' + average + '%';
};

new GraphAnalytics();