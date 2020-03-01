import { GetDataService } from "./../../services/get-data.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home-component",
  templateUrl: "./home-component.component.html",
  styleUrls: ["./home-component.component.scss"]
})
export class HomeComponent implements OnInit {
  public treasureRes: object;
  public rows: Array<object> = [];
  public isStart = false;
  public count = 0;
  public treasureArray: Array<any> = new Array(5);
  public rowListArray: Array<any> = [];
  constructor(private service: GetDataService) {}

  public ngOnInit(): void {
    this.rows = [{}, {}, {}, {}, {}];
    for (let i = 0; i < this.treasureArray.length; i++) {
      this.treasureArray[i] = [1];
    }
    for (let i = 0; i < this.treasureArray.length; i++) {
      for (let j = 0; j < this.treasureArray.length; j++) {
        this.treasureArray[i][j] = '';
      }
    }

    localStorage.setItem(
      'treasureHuntArray ',
      JSON.stringify(this.treasureArray)
    );
  }

  public getElementDetails(event: any) {
    this.count = this.count + 1;
    const rowIndex = event.target.parentNode.rowIndex;
    const cellIndex = event.target.cellIndex;
    event.target.className = "bgColor";
    this.rowListArray.push({ rowIndex, cellIndex });
    if (this.count === 3) {
      this.rowListArray.forEach((ele, index) => {
        this.treasureArray[ele.rowIndex][ele.cellIndex] = this.treasureRes[
          "treasures"
        ][ele.rowIndex][ele.cellIndex];
      });
      this.count = 0;
    }
  }

  public onSubmit(): void {
    const username = (document.getElementById("userName") as HTMLInputElement)
      .value;
    console.log(username);
    this.isStart = true;
    this.service.getData().subscribe((res: any) => {
      this.treasureRes = res;
      console.log(this.treasureRes);
    });
  }
}
