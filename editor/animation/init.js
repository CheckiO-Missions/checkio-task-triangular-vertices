//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        var maxN = 36;
        var maxHeight = 8;
        var edgeSize = 30;
        var edgeHeight = 26;
        var zx = 20;
        var zy = 20;
        var fullX = zx + maxHeight * edgeSize;
        var fullY = zy + maxHeight * edgeHeight;


        var colorCell = "#737370";
        var colorDark = "#294270";
        var colorOrange = "#F0801A";
        var colorLightOrange = "#FABA00";
        var colorBlue = "#6BA3CF";
        var colorLightBlue = "#8FC7ED";
        var colorWhite = "#FFFFFF";

        var attrDot = {"stroke": colorDark, "r": 4, "fill": colorDark};
        var attrDotSelected = {"stroke": colorOrange, "r": 4, "fill": colorOrange};
        var attrLine = {"stroke": colorOrange, "stroke-width": 2};
        var attrPlaceLine = {"stroke": colorBlue, "stroke-width": 1, "stroke-dasharray": ["-"]};
        var attrText = {"stroke": colorDark, "font-size": 12, "font-family": "Verdana"};
        var attrSquare = {"stroke": colorOrange, "stroke-width": 1};

        var tooltip = false;

        function createLinePath(x1, y1, x2, y2) {
            return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
        }

        function createMegaTriangle(paper) {
            var startX = fullX / 2;
            var startY = zy;
            var mark = 1;
            var maxInLine = 1;
            var dotSet = paper.set();
            for (var j = 0; j < maxHeight; j++) {
                paper.text(startX - edgeSize / 2, zy + j * edgeHeight, mark).attr(attrText);
                for (var i = 0; i < maxInLine; i++) {
                    dotSet.push(paper.circle(startX + i * edgeSize, zy + j * edgeHeight, 1).attr(attrDot));
                    dotSet[mark - 1].mark = mark;
                    if (i) {
                        paper.path(
                            createLinePath(
                                dotSet[mark - 1].attr("cx"),
                                dotSet[mark - 1].attr("cy"),
                                dotSet[mark - 2].attr("cx"),
                                dotSet[mark - 2].attr("cy")
                            )
                        ).attr(attrPlaceLine);
                        paper.path(
                            createLinePath(
                                dotSet[mark - 1].attr("cx"),
                                dotSet[mark - 1].attr("cy"),
                                dotSet[mark - maxInLine - 1].attr("cx"),
                                dotSet[mark - maxInLine - 1].attr("cy")
                            )
                        ).attr(attrPlaceLine);
                    }
                    if (i !== maxInLine - 1) {
                        paper.path(
                            createLinePath(
                                dotSet[mark - 1].attr("cx"),
                                dotSet[mark - 1].attr("cy"),
                                dotSet[mark - maxInLine].attr("cx"),
                                dotSet[mark - maxInLine].attr("cy")
                            )
                        ).attr(attrPlaceLine);
                    }
                    mark++;
                }
                startX -= edgeSize / 2;
                maxInLine++;
                if (i !== 1) {
                    paper.text(startX + i * edgeSize, zy + j * edgeHeight, mark - 1).attr(attrText);
                }
            }
            dotSet.toFront();
            return dotSet;
        }


        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            if (explanation) {
                var canvas = Raphael($content.find(".explanation")[0], fullX, fullY, 0, 0);
                var dotSet = createMegaTriangle(canvas);
                for (var i = 0; i < checkioInput.length; i++) {
                    dotSet[checkioInput[i] - 1].attr(attrDotSelected);
                }
                for (var j = 0; j < explanation.length; j++) {
                    for (i = 0; i < explanation[j].length - 1; i++) {
                        var from = explanation[j][i];
                        var to = explanation[j][i + 1];
                        canvas.path(
                            createLinePath(
                                dotSet[from - 1].attr("cx"),
                                dotSet[from - 1].attr("cy"),
                                dotSet[to - 1].attr("cx"),
                                dotSet[to - 1].attr("cy")
                            )
                        ).attr(attrLine);
                    }
                }
            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
//
        ext.set_console_process_ret(function (this_e, ret) {
            $tryit.find(".checkio-result-in").html(ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));

            var tDots = [];
            var tCanvas = Raphael($tryit.find(".tryit-canvas")[0], fullX, fullY, 0, 0);
            var tDotSet = createMegaTriangle(tCanvas);

            $tryit.find(".tryit-canvas").mouseenter(function (e) {
                if (tooltip) {
                    return false;
                }
                var $tooltip = $tryit.find(".tryit-canvas .tooltip");
                $tooltip.fadeIn(1000);
                setTimeout(function () {
                    $tooltip.fadeOut(1000);
                }, 2000);
                tooltip = true;
            });

            tDotSet.click(function () {
                var mark = this.mark;
                if (tDots.indexOf(mark) === -1) {
                    tDots.push(mark);
                    tDotSet[mark - 1].attr(attrDotSelected);
                }
                else {
                    tDots.splice(tDots.indexOf(mark), 1);
                    tDotSet[mark - 1].attr(attrDot);
                }
            });

            $tryit.find('.bn-check').click(function (e) {
                this_e.sendToConsoleCheckiO(tDots);
                e.stopPropagation();
                return false;
            });

        });

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";
        //Your Additional functions or objects inside scope
        //
        //
        //


    }
);
