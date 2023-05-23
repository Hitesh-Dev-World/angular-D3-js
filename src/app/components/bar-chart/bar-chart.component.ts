import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { BarData } from 'src/app/model/data';
import { UtilitiService } from 'src/app/services/utiliti.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() data: BarData[] = [];

  //TootTip Configration
  private tooltip: any;
  public tooltipData: BarData | null = null;
  public tooltipLeft = 0;
  public tooltipTop = 0;

  //SVG Configration
  public x:any;
  public y:any;
  private svg: any;
  private margin = 30;
  public highestValue!: string;
  private width = 390 - this.margin * 2;
  private height = 200 - this.margin * 2;


  constructor(private elementRef: ElementRef, private utility : UtilitiService) {}

  ngOnInit() {
    this.onCal();
    this.onXY_Config();
    this.drawBars(this.data);
  }

  private onCal(){
    let highestCurrentValue = 0;
    let tableLength = this.data.length;

    this.data.forEach((data, i) => {
      const barValue = Number(data.value);
      if (barValue > highestCurrentValue) {
          highestCurrentValue = barValue;
      }
      if (tableLength == i + 1) {
        this.highestValue = highestCurrentValue.toString();
      }
    });
  }

  private onXY_Config(){
    this.x = d3
    .scaleBand()
    .range([0, this.width])
    .domain(this.data.map((d:BarData) => d.label))
    .padding(0.2);
  
     this.y = d3
    .scaleLinear()
    .domain([0, Number(this.highestValue) + 50])
    .range([this.height, 0]);
  }

  private drawBars(data: any[]): void {
    this.svg = d3.select("#chart").append("svg")
      .attr("viewBox", `0 0 ${this.width + this.margin * 2} ${this.height + this.margin * 2}`)
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x))
      .selectAll("text")
      .attr('transform', 'translate(-10, 0)rotate(-40)')
      .style('text-anchor', 'end')
      .style("font-size", "5px")
      .style("color", "#261ae8");


    this.svg
      .append("g")
      .call(d3.axisLeft(this.y))
      .selectAll("text")
      .style(["font-size", "9px", "text-align", "center"]);

    // Create and fill the bars
    this.svg
      .selectAll("bars")
      .data(this.data)
      .enter()
      .append("rect")
      .attr("x", (d: BarData) => this.x(d.label))
      .attr("y", (d: BarData) => this.y(d.value))
      .attr("width", '10')
      .attr("height", 0)
      .on('mouseover', (event: any, d: BarData) => this.showTooltip(event, d))
      .on('mouseout', () => this.hideTooltip())
      .attr("fill", (d: BarData) => (this.utility.getColor(d.value)))
      .transition()
      .duration(3000)
      .attr("height", (d: BarData) => this.y(d.value) < this.height ? this.height - this.y(d.value) : this.height);

    this.tooltip = d3.select(this.elementRef.nativeElement).select('.tooltip');
  }

  private showTooltip(event: any, data: BarData) {
    this.tooltipData = data;
    this.tooltipLeft = event.pageX + 10;
    this.tooltipTop = event.pageY + 10;
    this.tooltip.style('display', 'block');
  }

  private hideTooltip() {
    this.tooltipData = null;
    this.tooltip.style('display', 'none');
  }

  @HostListener('window:resize')
  private onResize() {
    // this.drawBars(this.data);
  }

  public onAccendingOrder() {
    this.data.sort((a: any, b: any) => (a.value - b.value));

    this.svg.selectAll('rect')
      .data(this.data)
      .transition()
      .duration(1000)
      .attr("y", (d: BarData) => this.y(d.value))
      .attr("fill", (d: BarData) => (this.utility.getColor(d.value)))
      .attr("height", (d: BarData) => this.y(d.value) < this.height ? this.height - this.y(d.value) : this.height);
  }
  public onDecendingOrder() {
    this.data.sort((a: any, b: any) => b.value - a.value);

    this.svg.selectAll('rect')
      .data(this.data)
      .transition()
      .duration(1000)
      .attr("y", (d: BarData) => this.y(d.value))
      .attr("fill", (d: BarData) => (this.utility.getColor(d.value)))
      .attr("height", (d: BarData) => this.y(d.value) < this.height ? this.height - this.y(d.value) : this.height);
  }
}




