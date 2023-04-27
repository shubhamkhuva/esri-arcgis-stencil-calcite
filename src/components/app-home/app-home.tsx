import { Component, State, h } from "@stencil/core";
import { ServicesItem } from "../../app-types";
import { state } from "../../utils/app-store";
import { _apiHost, _endPoints } from "../../utils/constants";
import { request } from "../../assets/fetch";
import { getFilteredArray } from "../../utils/helper";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss",
  shadow: true,
})
export class AppHome {
  @State() services: Array<ServicesItem> = [];

  componentWillLoad() {
    this.getServices();
  }

  openModal(name) {
    state.servicesDescription = null;
    state.imageUrl = null;
    state.modal = true;
    state.servicesName = name;
    this.getServicesDetails(name);
  }

  async getServices() {
    try {
      let response = await request(_endPoints.GET_SERVICES_LIST);
      if (response["services"]) {
        this.services = getFilteredArray(
          response["services"],
          "type",
          "ImageServer"
        );
      }
      state.loadingServicesList = false;
    } catch (e) {
      state.loadingServicesList = false;
    }
  }

  async getServicesDetails(name) {
    try {
      state.loadingServicesDetails = true;
      state.loadingServicesImage = true;
      let response = await request(
        _endPoints.GET_SERVICES_DETAILS.replace("serviceName", name)
      );
      if (response["description"]) {
        state.servicesDescription = response["description"];
        this.getImageFromExtent(response["fullExtent"]);
      }
      state.loadingServicesDetails = false;
    } catch (e) {
      state.loadingServicesDetails = false;
    }
  }
  async getImageFromExtent(fullExtent) {
    try {
      let response = await request(
        _endPoints.GET_SERVICES_IMAGE.replace(
          "extent",
          `${fullExtent.xmin},${fullExtent.ymin},${fullExtent.xmax},${fullExtent.ymax}`
        ).replace("serviceName", state.servicesName)
      );
      if (response["href"]) {
        state.imageUrl = response.href;
      }
      state.loadingServicesImage = false;
    } catch (e) {
      state.loadingServicesImage = false;
    }
  }
  render() {
    return (
      <div class="app-home">
        {state.loadingServicesList ? (
          <div class="servicesGrids">
            <div class="servicesBox">
              <div class="loadingCard"></div>
            </div>
            <div class="servicesBox">
              <div class="loadingCard"></div>
            </div>
            <div class="servicesBox">
              <div class="loadingCard"></div>
            </div>
            <div class="servicesBox">
              <div class="loadingCard"></div>
            </div>
          </div>
        ) : (
          <div class="servicesGrids">
            {this.services.map((item) => {
              return (
                <calcite-card class="servicesBox">
                  <span slot="title">{item.name}</span>
                  <span slot="subtitle">Image Server</span>
                  <calcite-chip
                    slot="footer-end"
                    value="calcite chip"
                    icon="view-visible"
                    onClick={() => this.openModal(item.name)}
                  >
                    View Details
                  </calcite-chip>
                </calcite-card>
              );
            })}
          </div>
        )}

        {state.modal && (
          <calcite-modal
            aria-labelledby="modal-title"
            id="example-modal"
            open={state.modal}
            closeButtonDisabled={true}
            fullScreen
          >
            <div slot="header" id="modal-title">
              {state.servicesName}
            </div>
            <div slot="content">
              <calcite-label class="fontBold">Description</calcite-label>
              {state.loadingServicesDetails ? (
                <div class="loadingCard"></div>
              ) : (
                <div innerHTML={state.servicesDescription}></div>
              )}
              <calcite-label class="fontBold">Image</calcite-label>
              <div class={"imageDiv"}>
                {state.loadingServicesImage ? (
                  <div class="loadingImage"></div>
                ) : (
                  <img src={state.imageUrl} />
                )}
              </div>
            </div>

            <calcite-button
              slot="back"
              kind="neutral"
              width="full"
              onClick={() => (state.modal = false)}
            >
              Close
            </calcite-button>
          </calcite-modal>
        )}
      </div>
    );
  }
}
