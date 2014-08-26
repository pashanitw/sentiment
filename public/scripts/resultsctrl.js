/**
 * Created by shaikp on 8/23/2014.
 */

App.controller('ResultsController', [
    '$scope','$http',
    function ($scope,$http) {

        var prevBrandSelection;

        function mapModel(data){
            $scope.results=[];
            var t,s,sentimentModel;
            if (data.length > 0) {
                for(var i=0;i<data.length;i++){
                    t=data[i].tweet;
                    s=data[i].sentiment;
                    sentimentModel={
                        imgSrc: t.user.profile_image_url,
                        tweetLink: 'http://twitter.com/' + t.user.screen_name + '/status/' + t.id_str,
                        tweet: t.text,
                        score: s.score ? s.score : '--',
                        comparative: s.comparative ? s.comparative : '--',
                        favorited: t.favorite_count ? t.favorite_count : 0,
                        retweet: t.retweet_count ? t.retweet_count : 0,
                        wordsMatched: s.words && s.words.length ? s.words : '--',
                        positiveWords: s.positive && s.positive.length ? s.positive : '--',
                        negativeWords: s.negative && s.negative.length ? s.negative : '--'
                    };
                    $scope.results.push(sentimentModel);
                }
            } else {
                    sentimentModel={
                        tweet: "No Results Found!",
                        tweetLink: null
                    }
                    $scope.results.push(sentimentModel);
            }
        }
        $scope.$on('$viewContentLoaded', function () {
            loadBrands();
        });
        $scope.brands=[];
        function loadBrands(){
            $http.get('data/brands_list.json').then(function(data){
                $scope.brands=data.data.brands;
            },function(data){

            })
        }
        $scope.getBrandStats=function(brand){
            //document.getElementById("selectedBrand").backgroundColor = "blue";
            if(prevBrandSelection) {
                prevBrandSelection.active = false;
            }
            prevBrandSelection = brand;
            brand.active = true;
            var data= {
                search: brand.name
            }
            $http.post('/search', data).then(function(resp){
                mapModel(resp.data);
            },function(resp){
                console.log("error is",resp);
            });

        }
    }
]);