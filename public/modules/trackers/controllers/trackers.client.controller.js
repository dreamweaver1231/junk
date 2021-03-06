'use strict';

// Trackers controller
angular.module('trackers').controller('TrackersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Trackers', '$rootScope',
	function($scope, $stateParams, $location, Authentication, Trackers, $rootScope ) {
		$scope.authentication = Authentication;

		// Create new Tracker
		$scope.create = function() {
			// Create new Tracker object
			var temp = $rootScope.checklistsByCategory;
			var tracker = new Trackers ({
				details: this.details,
				value:temp,
			});
			console.log($rootScope.checklistsByCategory);

			// Redirect after save
			tracker.$save(function(response) {
				$location.path('trackers/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Tracker
		$scope.remove = function( tracker ) {
			if ( tracker ) { tracker.$remove();

				for (var i in $scope.trackers ) {
					if ($scope.trackers [i] === tracker ) {
						$scope.trackers.splice(i, 1);
					}
				}
			} else {
				$scope.tracker.$remove(function() {
					$location.path('trackers');
				});
			}
		};

		// Update existing Tracker
		$scope.update = function() {
			var tracker = $scope.tracker ;

			tracker.$update(function() {
				$location.path('trackers/' + tracker._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Trackers
		$scope.find = function() {
			$scope.trackers = Trackers.query();
		};

		// Find existing Tracker
		$scope.findOne = function() {
			$scope.tracker = Trackers.get({ 
				trackerId: $stateParams.trackerId
			});
		};
	}
]);